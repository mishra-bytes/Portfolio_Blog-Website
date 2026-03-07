"use client";

import { useEffect, useState, type FormEvent } from "react";

interface Comment {
  id: string;
  name: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  is_owner: boolean;
}

type BlogCommentsProps = {
  slug: string;
};

type CommentFormState = {
  name: string;
  email: string;
  content: string;
  secretKey: string;
};

type CommentFormProps = {
  slug: string;
  parentId?: string | null;
  submitLabel: string;
  onSubmitted: (comment: Comment) => void;
  onCancel?: () => void;
};

const OWNER_EMAIL = "aditya_mishra@outlook.in";

function createInitialFormState(): CommentFormState {
  return {
    name: "",
    email: "",
    content: "",
    secretKey: "",
  };
}

function OwnerBadge() {
  return (
    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-medium text-blue-700">
      (Owner)
    </span>
  );
}

function formatCommentDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function CommentForm({
  slug,
  parentId = null,
  submitLabel,
  onSubmitted,
  onCancel,
}: CommentFormProps) {
  const [formState, setFormState] = useState<CommentFormState>(
    createInitialFormState(),
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showOwnerSecret =
    formState.email.trim().toLowerCase() === OWNER_EMAIL;

  function updateField<K extends keyof CommentFormState>(
    field: K,
    value: CommentFormState[K],
  ) {
    setFormState((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload = {
      slug,
      name: formState.name.trim(),
      email: formState.email.trim().toLowerCase(),
      content: formState.content.trim(),
      parent_id: parentId,
      secretKey: showOwnerSecret ? formState.secretKey.trim() : undefined,
    };

    if (!payload.name || !payload.email || !payload.content) {
      setError("Please enter your name, email, and comment.");
      return;
    }

    if (showOwnerSecret && !payload.secretKey) {
      setError("Enter the owner secret key to post as the owner.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as {
        comment?: Comment;
        error?: string;
        details?: string | null;
      };

      if (!response.ok || !result.comment) {
        throw new Error(
          result.details
            ? `${result.error ?? "Unable to submit comment."} ${result.details}`
            : (result.error ?? "Unable to submit comment."),
        );
      }

      onSubmitted(result.comment);
      setFormState(createInitialFormState());
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to submit comment.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Name</span>
          <input
            type="text"
            value={formState.name}
            onChange={(event) => updateField("name", event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Email</span>
          <input
            type="email"
            value={formState.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="you@example.com"
            disabled={isSubmitting}
          />
          <span className="text-xs text-slate-500">
            Your email will not be published.
          </span>
        </label>

        {showOwnerSecret ? (
          <label className="grid gap-2">
            <span className="text-sm font-medium text-slate-700">
              Secret Key
            </span>
            <input
              type="password"
              value={formState.secretKey}
              onChange={(event) => updateField("secretKey", event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Owner secret key"
              disabled={isSubmitting}
            />
          </label>
        ) : null}

        <label className="grid gap-2">
          <span className="text-sm font-medium text-slate-700">Comment</span>
          <textarea
            value={formState.content}
            onChange={(event) => updateField("content", event.target.value)}
            className="min-h-32 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="Share your thoughts..."
            rows={parentId ? 4 : 5}
            disabled={isSubmitting}
          />
        </label>

        <div className="flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            {parentId
              ? "Your reply will appear nested under this comment."
              : "Your comment will appear directly under this article."}
          </p>
          <div className="flex items-center gap-3">
            {onCancel ? (
              <button
                type="button"
                onClick={onCancel}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900"
                disabled={isSubmitting}
              >
                Cancel
              </button>
            ) : null}
            <button
              type="submit"
              className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : submitLabel}
            </button>
          </div>
        </div>

        {error ? (
          <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export function BlogComments({ slug }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadComments() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/comments?slug=${encodeURIComponent(slug)}`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          },
        );

        const result = (await response.json()) as {
          comments?: Comment[];
          error?: string;
          details?: string | null;
        };

        if (!response.ok) {
          throw new Error(
            result.details
              ? `${result.error ?? "Unable to load comments."} ${result.details}`
              : (result.error ?? "Unable to load comments."),
          );
        }

        setComments(result.comments ?? []);
      } catch (loadError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load comments.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadComments();

    return () => controller.abort();
  }, [slug]);

  function handleInsertedComment(comment: Comment) {
    setComments((current) => [comment, ...current]);
    setActiveReplyId(null);
  }

  const topLevelComments = comments.filter((comment) => !comment.parent_id);

  return (
    <section className="mx-auto max-w-3xl">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">
          Discussion
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
          Comments
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Leave a note, question, or correction. Owner replies are verified
          server-side and displayed inline in the thread.
        </p>
      </div>

      <CommentForm
        slug={slug}
        submitLabel="Submit"
        onSubmitted={handleInsertedComment}
      />

      <div className="mt-8 space-y-4">
        {isLoading ? (
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-6 text-sm text-slate-500 shadow-sm">
            Loading comments...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-6 text-sm text-red-700">
            {error}
          </div>
        ) : topLevelComments.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-sm text-slate-500">
            No comments yet. Start the discussion.
          </div>
        ) : (
          topLevelComments.map((comment) => {
            const replies = comments.filter(
              (reply) => reply.parent_id === comment.id,
            );

            return (
              <article
                key={comment.id}
                className="rounded-3xl border border-slate-200 bg-white px-5 py-5 shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-sm font-semibold text-slate-900">
                      {comment.is_owner ? "Aditya Mishra" : comment.name}
                    </h3>
                    {comment.is_owner ? <OwnerBadge /> : null}
                  </div>
                  <time className="text-xs uppercase tracking-[0.22em] text-slate-400">
                    {formatCommentDate(comment.created_at)}
                  </time>
                </div>

                <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                  {comment.content}
                </p>

                <button
                  type="button"
                  onClick={() => setActiveReplyId(comment.id)}
                  className="text-sm text-blue-600 font-medium mt-2"
                >
                  Reply
                </button>

                {activeReplyId === comment.id ? (
                  <div className="mt-4">
                    <CommentForm
                      slug={slug}
                      parentId={comment.id}
                      submitLabel="Post Reply"
                      onSubmitted={handleInsertedComment}
                      onCancel={() => setActiveReplyId(null)}
                    />
                  </div>
                ) : null}

                {replies.length > 0 ? (
                  <div className="mt-5 space-y-3 border-l-2 border-slate-200 pl-4 ml-8">
                    {replies.map((reply) => (
                      <article
                        key={reply.id}
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="text-sm font-semibold text-slate-900">
                              {reply.is_owner ? "Aditya Mishra" : reply.name}
                            </h4>
                            {reply.is_owner ? <OwnerBadge /> : null}
                          </div>
                          <time className="text-xs uppercase tracking-[0.22em] text-slate-400">
                            {formatCommentDate(reply.created_at)}
                          </time>
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-slate-700">
                          {reply.content}
                        </p>
                      </article>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}
