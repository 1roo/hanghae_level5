import React, { useState } from "react";
import api2 from "../axios/api2";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";

const Comments = () => {
    const { quizId } = useParams();
    const queryClient = useQueryClient();
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedCommentContent, setEditedCommentContent] = useState("");

    //댓글 불러오기
    const { isLoading, isError, data: comments } = useQuery(
        ["comments", quizId],
        () => api2.get(`/comments?quizId=${quizId}`).then((res) => res.data)
    );

    //댓글등록
    const addCommentMutation = useMutation((comment) => api2.post("/comments", comment), {
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", quizId]);
        }
    });

    const addComment = async (commentData) => {
        try {
            await addCommentMutation.mutateAsync(commentData);
        } catch (error) {
            console.error("Failed to add comment:", error);
        }
    }

    //댓글수정
    const updateCommentMutation = useMutation(
        ({ id, content, quizId }) => api2.put(`/comments/${id}`, { content, quizId }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments", quizId]);
                setEditingCommentId(null);
            },
        }
    );

    const startEditing = (comment) => {
        setEditingCommentId(comment.id);
        setEditedCommentContent(comment.content);
    };

    const finishEditing = async () => {
        try {
            console.log('quizIdMutaion: ', quizId);
            await updateCommentMutation.mutateAsync({
                id: editingCommentId,
                content: editedCommentContent,
                quizId: quizId,
            });
            setEditingCommentId(null);
        } catch (error) {
            console.error("Failed to update comment:", error);
        }
    };

    //댓글삭제
    const deleteCommentMutation = useMutation((id) => api2.delete(`/comments/${id}`), {
        onSuccess: () => {
            queryClient.invalidateQueries(["comments", quizId]);
        },
    });

    const deleteComment = async (id) => {
        try {
            await deleteCommentMutation.mutateAsync(id);
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>댓글 가져오다 오류 발생</div>;

    return (
        <div>
            <h1>Comments</h1>
            {comments.map((comment) => (
                <div key={comment.id}>
                    {editingCommentId === comment.id ? (
                        <>
                            <input
                                type="text"
                                value={editedCommentContent}
                                onChange={(e) => setEditedCommentContent(e.target.value)}
                            />
                            <button onClick={finishEditing}>완료</button>
                        </>
                    ) : (
                        <>
                            <p>{comment.content}</p>
                            <button onClick={() => deleteComment(comment.id)}>Delete</button>
                            <button onClick={() => startEditing(comment)}>Update</button>
                        </>
                    )}
                </div>
            ))}
            {/* 댓글 등록 폼 */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const content = e.target.elements.content.value;
                    addComment({ quizId, content });
                    e.target.reset();
                }}
            >
                <input type="text" name="content" placeholder="Enter comment" />
                <button type="submit">Add Comment</button>
            </form>
        </div>
    );
};

export default Comments;
