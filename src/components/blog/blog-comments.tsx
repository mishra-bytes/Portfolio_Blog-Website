"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent,
  type MouseEvent,
} from "react";
import { getSupabaseBrowserClient } from "@/lib/supabaseBrowserClient";

type BlogCommentsProps = {
  slug: string;
};

type CommentRow = {
  id: string;
  slug: string;
  name: string | null;
  content: string;
  created_at: string;
  parent_id: string | null;
  upvotes: number | null;
};

type DiscussionComment = {
  id: string;
  slug: string;
  name: string;
  content: string;
  created_at: string;
  parent_id: string | null;
  upvotes: number;
  replies: DiscussionComment[];
};

type CommentItemProps = {
  comment: DiscussionComment;
  slug: string;
  onReplySubmitted: () => Promise<void>;
};

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 3l7 3v5c0 4.5-2.9 8.6-7 10-4.1-1.4-7-5.5-7-10V6l7-3z" />
      <path d="m9.5 12 1.7 1.7 3.3-3.7" />
    </svg>
  );
}

function MoreMenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="5" cy="12" r="1.8" />
      <circle cx="12" cy="12" r="1.8" />
      <circle cx="19" cy="12" r="1.8" />
    </svg>
  );
}

function UpvoteIcon({ active }: { active: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={active ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 5 6.5 11h3.5v8h4v-8h3.5L12 5z" />
    </svg>
  );
}

function ReplyIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    </svg>
  );
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function formatCommentDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function buildCommentTree(rows: CommentRow[]) {
  const nodes = new Map<string, DiscussionComment>();
  const rootComments: DiscussionComment[] = [];

  for (const row of rows) {
    nodes.set(row.id, {
      id: row.id,
      slug: row.slug,
      name: row.name?.trim() || "Reader",
      content: row.content,
      created_at: row.created_at,
      parent_id: row.parent_id,
      upvotes: row.upvotes ?? 0,
      replies: [],
    });
  }

  for (const row of rows) {
    const node = nodes.get(row.id);

    if (!node) {
      continue;
    }

    if (row.parent_id) {
      const parent = nodes.get(row.parent_id);

      if (parent) {
        parent.replies.push(node);
        continue;
      }
    }

    rootComments.push(node);
  }

  return rootComments;
}

function CommentItem({ comment, slug, onReplySubmitted }: CommentItemProps) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [upvotes, setUpvotes] = useState(comment.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);

  useEffect(() => {
    setUpvotes(comment.upvotes);
  }, [comment.upvotes]);

  const isLongComment = comment.content.length > 220;
  const visibleContent =
    isLongComment && !isExpanded
      ? `${comment.content.slice(0, 220).trimEnd()}...`
      : comment.content;

  async function handleUpvote(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    event.preventDefault();

    const nextHasUpvoted = !hasUpvoted;
    const incrementVal = nextHasUpvoted ? 1 : -1;

    setUpvotes((prev) => prev + incrementVal);
    setHasUpvoted(nextHasUpvoted);

    try {
      const { error } = await supabase.rpc("increment_upvote", {
        target_id: comment.id,
        increment_val: incrementVal,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      setUpvotes((prev) => prev - incrementVal);
      setHasUpvoted(!nextHasUpvoted);
      console.error("Failed to update comment upvote:", error);
    }
  }

  async function submitReply() {
    const content = replyValue.trim();

    if (!content || isSubmittingReply) {
      return;
    }

    setIsSubmittingReply(true);

    try {
      const { error } = await supabase.from("comments").insert({
        slug,
        content,
        parent_id: comment.id,
      });

      if (error) {
        throw error;
      }

      setReplyValue("");
      setIsReplying(false);
      await onReplySubmitted();
    } catch (error) {
      console.error("Failed to submit reply:", error);
    } finally {
      setIsSubmittingReply(false);
    }
  }

  async function handleReplyKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    await submitReply();
  }

  const replyCount = comment.replies.length;

  return (
    <article className="mb-10 border-b border-slate-100 pb-10 last:mb-0 last:border-b-0 last:pb-0">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
            {getInitials(comment.name)}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center text-sm">
              <span className="font-medium text-slate-900">{comment.name}</span>
            </div>
            <p className="mt-1 text-sm text-slate-500">
              {formatCommentDate(comment.created_at)}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-400 transition-colors hover:text-slate-600"
          aria-label={`More actions for ${comment.name}`}
        >
          <MoreMenuIcon />
        </button>
      </div>

      <p className="mt-4 leading-relaxed text-slate-800">
        {visibleContent}{" "}
        {isLongComment && !isExpanded ? (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="inline text-sm font-medium text-slate-500 transition-colors hover:text-slate-800"
          >
            more
          </button>
        ) : null}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-500">
        <button
          type="button"
          onClick={handleUpvote}
          className={`inline-flex min-h-11 items-center gap-2 transition-colors ${
            hasUpvoted ? "text-blue-600" : "hover:text-slate-800"
          }`}
          aria-pressed={hasUpvoted}
        >
          <UpvoteIcon active={hasUpvoted} />
          <span>{upvotes}</span>
        </button>

        <div className="inline-flex min-h-11 items-center gap-2">
          <ReplyIcon />
          <span>
            {replyCount} {replyCount === 1 ? "reply" : "replies"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsReplying((current) => !current)}
          className="min-h-11 font-medium transition-colors hover:text-slate-800"
        >
          Reply
        </button>
      </div>

      {isReplying ? (
        <div className="mt-4 flex items-start gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200" />
          <input
            type="text"
            value={replyValue}
            onChange={(event) => setReplyValue(event.target.value)}
            onKeyDown={handleReplyKeyDown}
            placeholder="Write a reply..."
            className="flex-grow rounded-lg border border-slate-100 bg-slate-50 p-2 text-sm text-slate-700 outline-none transition-colors focus:border-slate-300"
            autoFocus
            disabled={isSubmittingReply}
          />
        </div>
      ) : null}

      {comment.replies.length > 0 ? (
        <div className="mt-6 ml-6 space-y-6 border-l-2 border-slate-100 pl-4 md:ml-10 md:pl-6">
          {comment.replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              slug={slug}
              onReplySubmitted={onReplySubmitted}
            />
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function BlogComments({ slug }: BlogCommentsProps) {
  const supabase = useMemo(() => getSupabaseBrowserClient(), []);
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUnavailable, setIsUnavailable] = useState(false);

  const loadComments = useCallback(async () => {
    setIsLoading(true);
    setIsUnavailable(false);

    try {
      const { data, error } = await supabase
        .from("comments")
        .select("id, slug, name, content, created_at, parent_id, upvotes")
        .eq("slug", slug)
        .order("created_at", { ascending: true });

      if (error) {
        throw error;
      }

      setComments((data ?? []) as CommentRow[]);
    } catch (error) {
      console.error("Failed to load comments:", error);
      setIsUnavailable(true);
    } finally {
      setIsLoading(false);
    }
  }, [slug, supabase]);

  useEffect(() => {
    void loadComments();
  }, [loadComments]);

  const rootComments = useMemo(() => buildCommentTree(comments), [comments]);
  const totalResponses = comments.length;

  return (
    <section aria-labelledby="responses-heading">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="responses-heading"
          className="text-2xl font-bold text-slate-900"
        >
          Responses ({totalResponses})
        </h2>
        <div className="text-slate-400" aria-hidden="true">
          <ShieldIcon />
        </div>
      </div>

      <div className="mt-8 flex items-start gap-4">
        <div className="h-10 w-10 shrink-0 rounded-full bg-slate-200" />
        <div className="flex-grow rounded-xl border border-slate-100 bg-slate-50 p-4 text-slate-400">
          What are your thoughts?
        </div>
      </div>

      <div className="mt-12">
        {isLoading ? (
          <div className="text-sm text-slate-500">Loading responses...</div>
        ) : isUnavailable ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
            Comments are temporarily unavailable.
          </div>
        ) : rootComments.length === 0 ? (
          <div className="text-sm text-slate-500">
            No responses yet. Start the discussion.
          </div>
        ) : (
          rootComments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              slug={slug}
              onReplySubmitted={loadComments}
            />
          ))
        )}
      </div>
    </section>
  );
}
