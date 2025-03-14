export enum NotificationType {
  // Transactional
  CHALLENGE_JOIN_REQUEST = "CHALLENGE_JOIN_REQUEST",
  CHALLENGE_JOIN_RESPONSE = "CHALLENGE_JOIN_RESPONSE",
  CHALLENGE_DELETED = "CHALLENGE_DELETED",
  CHAT_MESSAGE = "CHAT_MESSAGE",

  // Support Ticket Notifications
  SUPPORT_TICKET_CREATED = "SUPPORT_TICKET_CREATED",
  SUPPORT_TICKET_MESSAGE = "SUPPORT_TICKET_MESSAGE",
  SUPPORT_TICKET_STATUS_CHANGE = "SUPPORT_TICKET_STATUS_CHANGE",

  // Async/Engagement
  WEEKLY_LEADERBOARD = "WEEKLY_LEADERBOARD",
  LEADERBOARD_POSITION_CHANGE = "LEADERBOARD_POSITION_CHANGE",
}

export interface BaseNotificationPayload {
  type: NotificationType;
}

// Transactional Payloads
export interface ChallengeJoinRequestPayload extends BaseNotificationPayload {
  type: NotificationType.CHALLENGE_JOIN_REQUEST;
  challengeId: string;
  userId: string;
  userName: string;
}

export interface ChallengeJoinResponsePayload extends BaseNotificationPayload {
  type: NotificationType.CHALLENGE_JOIN_RESPONSE;
  challengeId: string;
  challengeName: string;
  status: "approved" | "rejected" | "banned";
}

export interface ChallengeDeletedPayload extends BaseNotificationPayload {
  type: NotificationType.CHALLENGE_DELETED;
  challengeId: string;
  challengeName: string;
  reason?: string;
}

export interface ChatMessagePayload extends BaseNotificationPayload {
  type: NotificationType.CHAT_MESSAGE;
  challengeId: string;
  messageId: string;
  senderId: string;
  senderName: string;
  messagePreview: string;
}

// Async/Engagement Payloads
export interface WeeklyLeaderboardPayload extends BaseNotificationPayload {
  type: NotificationType.WEEKLY_LEADERBOARD;
  challengeId: string;
  challengeName: string;
  userRank: number;
  totalParticipants: number;
}

export interface LeaderboardPositionChangePayload
  extends BaseNotificationPayload {
  type: NotificationType.LEADERBOARD_POSITION_CHANGE;
  challengeId: string;
  challengeName: string;
  oldPosition: number;
  newPosition: number;
  direction: "up" | "down";
}

// Support Ticket Notifications
export interface SupportTicketCreatedPayload extends BaseNotificationPayload {
  type: NotificationType.SUPPORT_TICKET_CREATED;
  ticketId: string;
  ticketTitle: string;
  ticketType: string;
  userId: string; // The user who created the ticket
  userName: string | null;
}

export interface SupportTicketMessagePayload extends BaseNotificationPayload {
  type: NotificationType.SUPPORT_TICKET_MESSAGE;
  ticketId: string;
  ticketTitle: string;
  messageId: string;
  messageContent: string;
  isStaffMessage: boolean; // Whether the message is from staff or user
  senderId: string;
  senderName: string | null;
}

export interface SupportTicketStatusChangePayload
  extends BaseNotificationPayload {
  type: NotificationType.SUPPORT_TICKET_STATUS_CHANGE;
  ticketId: string;
  ticketTitle: string;
  oldStatus: string;
  newStatus: string;
  updatedByStaff: boolean; // Whether the status was changed by staff or user
}

export type NotificationPayload =
  | ChallengeJoinRequestPayload
  | ChallengeJoinResponsePayload
  | ChallengeDeletedPayload
  | ChatMessagePayload
  | WeeklyLeaderboardPayload
  | LeaderboardPositionChangePayload
  | SupportTicketCreatedPayload
  | SupportTicketMessagePayload
  | SupportTicketStatusChangePayload;
