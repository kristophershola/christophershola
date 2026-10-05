import { useState, type FC, type ReactNode } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronUp,
  Calendar,
  Clock,
  Bell,
  Video,
  Users,
  Link as LinkIcon,
  MoreHorizontal,
} from "lucide-react";

interface Participant {
  name: string;
  avatar: string;
}

export interface MeetingCardProps {
  title: string;
  date: string;
  time: string;
  duration: string;
  meetingLink: string;
  notification: string;
  recording?: boolean;
  aiNotes?: boolean;
  participants: Participant[];
  description: string;
}

const defaultMeeting: MeetingCardProps = {
  title: "Product demo with FinPay",
  date: "Monday, 15 Dec 2025",
  time: "1:30 PM",
  duration: "2:00 PM",
  meetingLink: "Google Meet",
  notification: "30 minutes before",
  participants: [
    { name: "Ethan Carter", avatar: "https://i.pravatar.cc/40?img=1" },
    { name: "Lily Hayes", avatar: "https://i.pravatar.cc/40?img=2" },
    { name: "Max Reed", avatar: "https://i.pravatar.cc/40?img=3" },
  ],
  description:
    "A live walkthrough of FinPay's product, covering core workflows, key features, and real-world use cases, with time for questions and next steps.",
};

const MeetingCard: FC<MeetingCardProps> = ({
  title,
  date,
  time,
  duration,
  meetingLink,
  notification,
  participants,
  description,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [isRecording, setIsRecording] = useState(true);
  const [isAiEnabled, setIsAiEnabled] = useState(true);

  const spring = { type: "spring", stiffness: 300, damping: 30 } as const;

  return (
    <motion.div
      layout="size"
      transition={spring}
      className="bg-card text-card-foreground border-border w-full overflow-hidden rounded-xl border shadow-lg"
    >
      <div
        className="flex cursor-pointer items-center justify-between gap-2 p-4 select-none"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex min-w-0 items-center gap-3">
          <div className="bg-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-md">
            <Calendar size={18} className="text-primary-foreground" />
          </div>
          <div className="min-w-0">
            <p className="text-foreground truncate text-sm font-bold">{title}</p>
            <p className="text-muted-foreground text-xs">Today, {time}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="flex -space-x-2 overflow-hidden">
            {participants.slice(0, 3).map((p, i) => (
              <img
                key={i}
                src={p.avatar}
                className="border-background h-6 w-6 rounded-full border-2 object-cover"
                alt={p.name}
              />
            ))}
          </div>
          <motion.div
            animate={{ rotate: expanded ? 0 : 180 }}
            className="border-border bg-background text-muted-foreground flex h-8 w-8 items-center justify-center rounded-md border"
          >
            <ChevronUp size={18} />
          </motion.div>
        </div>
      </div>

      <AnimatePresence initial={false} mode="sync">
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={spring}
            className="overflow-hidden"
          >
            <div className="text-muted-foreground border-border bg-background space-y-4 rounded-t-xl border-t p-4 text-sm">
              <Row icon={<Calendar size={15} />} label="Date">
                <Tag>{date}</Tag>
              </Row>

              <Row icon={<Clock size={15} />} label="Time">
                <div className="flex flex-wrap items-center justify-end gap-1">
                  <Tag>{time}</Tag>
                  <span className="text-muted-foreground text-xs">to</span>
                  <Tag>{duration}</Tag>
                </div>
              </Row>

              <Row icon={<Video size={15} />} label="Link">
                <Tag className="max-w-32 sm:max-w-56 md:max-w-64 lg:max-w-72">
                  <LinkIcon size={12} className="shrink-0" />
                  <span className="truncate">{meetingLink}</span>
                </Tag>
              </Row>

              <Row icon={<Bell size={15} />} label="Notification">
                <Tag>{notification}</Tag>
              </Row>

              <Row icon={<Video size={15} />} label="Recording">
                <Toggle active={isRecording} onChange={setIsRecording} />
              </Row>

              <Row icon={<Users size={15} />} label="AI notetaking">
                <Toggle active={isAiEnabled} onChange={setIsAiEnabled} />
              </Row>

              <div className="border-border space-y-2 border-t pt-3">
                <p className="text-muted-foreground text-xs font-medium">
                  Participants
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  {participants.map((p, i) => (
                    <div
                      key={i}
                      className="bg-muted/50 border-border flex items-center gap-2 rounded-md border px-2 py-1"
                    >
                      <img
                        src={p.avatar}
                        className="h-5 w-5 rounded-full"
                        alt=""
                      />
                      <span className="text-foreground text-xs font-medium">
                        {p.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-border border-t pt-3">
                <p className="text-muted-foreground mb-1 text-xs font-medium">
                  Description
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="bg-muted/40 border-border flex flex-wrap items-center justify-between gap-3 border-t p-3">
              <p className="text-muted-foreground text-sm font-medium">
                Going?
              </p>
              <div className="flex flex-wrap items-center gap-1.5 sm:flex-nowrap">
                {["Yes", "No", "Maybe"].map((opt) => (
                  <button
                    key={opt}
                    className="border-border text-foreground bg-background active:bg-accent rounded-md border px-3 py-1 text-xs font-medium transition-colors sm:text-sm"
                  >
                    {opt}
                  </button>
                ))}
                <MoreHorizontal
                  size={16}
                  className="text-muted-foreground ml-1 hidden cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Row = ({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) => (
  <div className="flex items-center justify-between gap-2">
    <div className="text-muted-foreground flex shrink-0 items-center gap-2">
      {icon}
      <span className="text-xs font-medium whitespace-nowrap">{label}</span>
    </div>
    <div className="flex min-w-0 flex-1 justify-end">{children}</div>
  </div>
);

const Tag = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => (
  <div
    className={`border-border text-foreground bg-muted/40 flex items-center gap-1 overflow-hidden rounded-md border px-2 py-1 text-xs whitespace-nowrap ${className}`}
  >
    {children}
  </div>
);

const Toggle = ({
  active,
  onChange,
}: {
  active: boolean;
  onChange: (v: boolean) => void;
}) => (
  <div
    onClick={() => onChange(!active)}
    className={`flex h-6 w-10 cursor-pointer items-center rounded-full px-1 transition-colors duration-200 ${
      active ? "bg-primary/20" : "bg-muted"
    }`}
  >
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 30 } as const}
      animate={{ x: active ? 16 : 0 }}
      className={`h-4 w-4 rounded-full shadow-sm ${
        active ? "bg-primary" : "bg-muted-foreground"
      }`}
    />
  </div>
);

const disclosureSpring = {
  type: "spring",
  bounce: 0.1,
  duration: 0.4,
} as const;

export interface CreateMeetingMenuProps {
  meeting?: MeetingCardProps;
}

export default function CreateMeetingMenu({
  meeting = defaultMeeting,
}: CreateMeetingMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex h-11 items-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {!open ? (
          <motion.button
            key="collapsed"
            layoutId="shared-container"
            onClick={() => setOpen(true)}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={disclosureSpring}
            style={{ borderRadius: 10 }}
            className="flex h-11 cursor-pointer items-center gap-2 whitespace-nowrap bg-[#0000ff] px-6 font-mono text-sm font-medium tracking-widest uppercase shadow-sm text-white transition-colors hover:bg-[#0000cc] active:scale-[0.96]"
          >
            <motion.div layoutId="label" className="flex items-center gap-2">
              <HugeiconsIcon icon={Add01Icon} size={20} strokeWidth={1.5} />
              Create New
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="expanded"
            layoutId="shared-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.1 } }}
            transition={disclosureSpring}
            style={{ borderRadius: 16 }}
            className="border-border bg-muted/40 absolute right-0 top-full z-50 mt-2 max-h-[calc(100dvh-5rem)] w-96 max-w-[calc(100vw-32px)] overflow-y-auto border p-1 shadow-lg"
          >
            <div className="flex items-center justify-between px-4 py-3">
              <motion.p
                layoutId="label"
                className="font-mono text-sm font-medium tracking-widest uppercase text-foreground"
              >
                Create New
              </motion.p>
              <motion.button
                onClick={() => setOpen(false)}
                whileTap={{ scale: 0.95 }}
                aria-label="Close menu"
                className="bg-secondary text-secondary-foreground flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
              >
                <HugeiconsIcon
                  icon={Cancel01Icon}
                  size={16}
                  className="text-secondary-foreground"
                  strokeWidth={2.5}
                />
              </motion.button>
            </div>

            <MeetingCard {...meeting} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
