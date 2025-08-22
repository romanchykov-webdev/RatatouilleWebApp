'use client';

import React, { ChangeEvent, JSX, useEffect, useMemo, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { IAllUserCommentedRecipe, ICommentDta, ICommentDtaResponse } from '@/types/comment.type';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/store/hooks';
import { postCommentThunk } from '@/store/thunks/postCommentThunk';
import LoaderCustomAbsolute from '@/components/Loaders/LoaderCustomAbsolute';
import { getAllCommentsByRecipe } from '@/store/api/getAllComments';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { formatDate } from '@/helpers/formatDate';
import { useShadowBox } from '@/helpers/hooks/useShadowBox';
import { truncateText } from '@/helpers/truncateText';
import { getAllCommentsUserData } from '@/store/api/getAllCommentsUserData';
import { Trash2 } from 'lucide-react';
import { IOwner } from '@/types';
import { removeComment } from '@/store/api/removeComment';

interface ICommentsProps {
  recipeId: string | undefined;
  userId: string | null;
  ownerRecipe: IOwner;
}

interface CommentItemProps {
  comment: ICommentDtaResponse;
  userMap: Record<string, IAllUserCommentedRecipe>;
  shadowBox: () => React.CSSProperties;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment, userMap, shadowBox }) => {
  const user = userMap[comment.user_id_commented];
  // useEffect(() => {
  //   console.log('CommentItem mounted');
  // }, []);
  return (
    <div
      style={shadowBox()}
      className="border-[1px] border-neutral-300 p-2 rounded-[10px] relative min-h-[100px] w-full"
    >
      <div className="flex gap-x-5">
        {/* Avatar и имя пользователя */}
        <div className="flex flex-col gap-y-2 items-center">
          <p style={{ fontSize: 12 }}>{formatDate(comment.created_at)}</p>
          <Avatar className="w-[50px] h-[50px] bg-red-500">
            <AvatarImage src={user?.avatar} alt="avatar" />
          </Avatar>
          <p style={{ fontSize: 12 }}>{truncateText(user?.user_name || '', 10)}</p>
        </div>

        {/* Комментарий */}
        <div className="bg-neutral-500 w-full rounded-[8px] p-2 flex-1 flex">
          <h6 className="self-stretch">{comment.comment}</h6>
        </div>
      </div>
    </div>
  );
};

const CommentsComponent: React.FC<ICommentsProps> = ({
  recipeId,
  userId,
  ownerRecipe,
}: ICommentsProps): JSX.Element => {
  const [textValue, setTextValue] = useState('');

  // все комментарии
  const [allCommentsByRecipe, setAllCommentsByRecipe] = useState<ICommentDtaResponse[]>([]);

  // сохраняем все айды пользователей
  const [allCommentedUserIds, setAllCommentedUserIds] = useState<string[]>([]);

  // храним данные пользователей
  const [allUserCommentedData, setAllUserCommentedData] = useState<IAllUserCommentedRecipe[]>([]);

  const [isLoadingUsersData, setIsLoadingUsersData] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const { shadowBox } = useShadowBox();

  const dispatch = useAppDispatch();
  // console.log('CommentsComponent userId', userId);

  // отправка комментария
  const addComment = async () => {
    setIsLoading(true);
    if (!userId || !recipeId) {
      toast.error('You must be logged in and have a valid recipe to comment');
      setIsLoading(false);
      return;
    }

    if (!textValue.trim()) {
      toast.error('Add comment');
      setIsLoading(false);
      return;
    }

    const commentData: ICommentDta = {
      post_id: recipeId,
      user_id_commented: userId,
      comment: textValue,
    };

    dispatch(postCommentThunk(commentData));

    setAllCommentsByRecipe(prev => [
      {
        id: Date.now().toString(),
        post_id: recipeId,
        user_id_commented: userId,
        comment: commentData.comment,
        created_at: new Date().toISOString(),
      },
      ...prev,
    ]);

    setTextValue('');
    setIsLoading(false);
  };

  // получение комментариев
  useEffect(() => {
    if (!recipeId) return;

    const fetchAllComments = async () => {
      const res = await getAllCommentsByRecipe(recipeId);
      setAllCommentsByRecipe(res ?? []);
    };
    fetchAllComments();
  }, [recipeId]);

  // Получаем уникальные айди пользователей
  useEffect(() => {
    if (!allCommentsByRecipe.length) return; // ничего не делаем, если массив пуст

    const uniqueUserIds = Array.from(new Set(allCommentsByRecipe.map(c => c.user_id_commented)));
    setAllCommentedUserIds(uniqueUserIds);
  }, [allCommentsByRecipe]);

  // Получаем данные пользователей
  useEffect(() => {
    if (!allCommentedUserIds.length) return; // если пусто — ничего не делаем

    const fetchUsers = async () => {
      setIsLoadingUsersData(true);
      const res = await getAllCommentsUserData(allCommentedUserIds);
      setAllUserCommentedData(res ?? []);
      setIsLoadingUsersData(false);
    };
    fetchUsers();
  }, [allCommentedUserIds]);

  // Мемоизация для быстрого поиска пользователя по id
  const userMap = useMemo(() => {
    const map: Record<string, IAllUserCommentedRecipe> = {};
    allUserCommentedData.forEach(u => {
      map[u.user_id] = u;
    });
    return map;
  }, [allUserCommentedData]);

  // button remove recipe
  const handlerRemoveComment = async (commentId: string) => {
    console.log('removeComment commentId', commentId);
    setAllCommentsByRecipe(prev => prev.filter(item => item.id !== commentId));
    await removeComment(commentId);

    toast.success('Comment removed successfully');
  };

  // console.log('allUserCommentedData', allUserCommentedData);
  // useEffect(() => {
  //   console.log('CommentsComponent mounted');
  // }, []);
  return (
    <article className="flex flex-col">
      {userId && (
        <div>
          {/* Форма добавления комментария */}
          <div className="flex flex-col md:flex-row gap-1 items-center mb-5">
            <Textarea
              value={textValue}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setTextValue(e.target.value)}
              placeholder="Type your message here."
              className="min-h-[200px]"
            />
            <Button
              disabled={isLoading}
              onClick={addComment}
              className=" w-full h-[70px] text-blue-500 hover:bg-blue-500 hover:text-black md:w-[70px] md:h-[70px] md:ml-5 flex justify-center items-center"
            >
              {isLoading ? (
                <LoaderCustomAbsolute />
              ) : (
                <Send style={{ width: '50px', height: '50px' }} />
              )}
            </Button>
          </div>

          {/* Список комментариев */}
          {isLoadingUsersData ? (
            <LoaderCustomAbsolute />
          ) : (
            <div className="flex flex-col gap-y-3">
              {allCommentsByRecipe.map(comment => (
                <div key={comment.id} className="flex w-full items-center  gap-x-2">
                  <CommentItem
                    // key={comment.id}
                    comment={comment}
                    userMap={userMap}
                    shadowBox={shadowBox}
                  />
                  {(ownerRecipe.id === userId || userId === comment.user_id_commented) && (
                    <Button
                      onClick={() => handlerRemoveComment(comment.id)}
                      className="bg-red-400 hover:bg-red-500"
                    >
                      <Trash2 className="text-black" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </article>
  );
};
export default CommentsComponent;
