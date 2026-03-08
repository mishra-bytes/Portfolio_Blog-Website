"use client";

import { useMemo, useState, type MouseEvent } from "react";

type BlogCommentsProps = {
  slug: string;
};

type DiscussionComment = {
  id: string;
  name: string;
  pronoun?: string;
  date: string;
  content: string;
  initialUpvotes: number;
  replies?: DiscussionComment[];
};

type CommentItemProps = {
  comment: DiscussionComment;
};

const MOCK_COMMENTS: DiscussionComment[] = [
  {
    id: "response-1",
    name: "Rhea Kapoor",
    pronoun: "she/her",
    date: "March 8, 2026",
    content:
      "The way you broke down model iteration here feels very grounded in actual engineering practice. I especially liked the emphasis on debugging failure modes before reaching for more complexity in the architecture.",
    initialUpvotes: 24,
    replies: [
      {
        id: "response-1-reply-1",
        name: "Neel Roy",
        date: "March 8, 2026",
        content:
          "Agreed. The deployment framing is what made the article useful for me too, especially the emphasis on practical iteration instead of benchmark obsession.",
        initialUpvotes: 5,
      },
      {
        id: "response-1-reply-2",
        name: "Sara Khan",
        pronoun: "she/her",
        date: "March 8, 2026",
        content:
          "I had the same reaction. It reads more like an engineering notebook than a marketing summary, which is rare.",
        initialUpvotes: 3,
        replies: [
          {
            id: "response-1-reply-2-child-1",
            name: "Kabir Mehta",
            date: "March 9, 2026",
            content:
              "That nested explanation of tradeoffs was the strongest part for me as well.",
            initialUpvotes: 2,
          },
        ],
      },
    ],
  },
  {
    id: "response-2",
    name: "Arjun Bhatia",
    pronoun: "he/him",
    date: "March 7, 2026",
    content:
      "This was useful because it tied system behavior back to real deployment constraints instead of treating inference like a notebook-only exercise. I would be curious to read a follow-up on monitoring drift once the pipeline is in production.",
    initialUpvotes: 17,
    replies: [
      {
        id: "response-2-reply-1",
        name: "Ananya Das",
        date: "March 8, 2026",
        content:
          "A monitoring follow-up would be strong. Drift and annotation feedback loops are usually where the real pain starts.",
        initialUpvotes: 4,
      },
    ],
  },
  {
    id: "response-3",
    name: "Maya Singh",
    date: "March 6, 2026",
    content:
      "Clear write-up. The section on practical tradeoffs between latency and robustness made the piece much stronger than a typical project summary, and the examples made it easy to map the ideas back to my own work.",
    initialUpvotes: 9,
  },
];

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

function CommentItem({ comment }: CommentItemProps) {
  const [upvotes, setUpvotes] = useState(comment.initialUpvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const isLongComment = comment.content.length > 220;
  const visibleContent =
    isLongComment && !isExpanded
      ? `${comment.content.slice(0, 220).trimEnd()}...`
      : comment.content;

  function handleUpvote(event: MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    event.preventDefault();
    setUpvotes((prev) => (hasUpvoted ? prev - 1 : prev + 1));
    setHasUpvoted(!hasUpvoted);
    // TODO: Call Supabase RPC here
  }

  const replyCount = comment.replies?.length ?? 0;

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
              {comment.pronoun ? (
                <span className="ml-1 text-slate-500">{comment.pronoun}</span>
              ) : null}
            </div>
            <p className="mt-1 text-sm text-slate-500">{comment.date}</p>
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

      <p className="mt-4 text-slate-800 leading-relaxed">
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
          onClick={() => setIsReplying(!isReplying)}
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
            placeholder="Write a reply..."
            className="flex-grow rounded-lg border border-slate-100 bg-slate-50 p-2 text-sm text-slate-700 outline-none transition-colors focus:border-slate-300"
            autoFocus
          />
        </div>
      ) : null}

      {comment.replies && comment.replies.length > 0 ? (
        <div className="mt-6 ml-6 space-y-6 border-l-2 border-slate-100 pl-4 md:ml-10 md:pl-6">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      ) : null}
    </article>
  );
}

export function BlogComments({ slug }: BlogCommentsProps) {
  void slug;

  const responses = useMemo(() => MOCK_COMMENTS, []);

  return (
    <section aria-labelledby="responses-heading">
      <div className="flex items-center justify-between gap-4">
        <h2
          id="responses-heading"
          className="text-2xl font-bold text-slate-900"
        >
          Responses (192)
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
        {responses.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </section>
  );
}
