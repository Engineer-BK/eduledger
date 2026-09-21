import { NextResponse } from "next/server";
import { INITIAL_ANNOUNCEMENTS, Announcement } from "@/lib/announcements";

// In-memory fallback array for server state demo
let announcementsStore: Announcement[] = [...INITIAL_ANNOUNCEMENTS];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: announcementsStore,
    total: announcementsStore.length,
    unreadCount: announcementsStore.filter((a) => !a.isRead).length,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required." },
        { status: 400 }
      );
    }

    const now = new Date();
    const newAnnouncement: Announcement = {
      id: `ann-${Date.now()}`,
      title: body.title,
      content: body.content,
      author: body.author || "School Administrator",
      authorRole: body.authorRole || "ADMIN",
      category: body.category || "GENERAL",
      targetAudience: body.targetAudience || "ALL",
      dateFormatted: `${now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}, ${now.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}`,
      timestamp: now.toISOString(),
      isPinned: Boolean(body.isPinned),
      requireAcknowledgment: Boolean(body.requireAcknowledgment),
      acknowledgedBy: [],
      isRead: false,
      attachments: body.attachments || [],
      stats: body.requireAcknowledgment
        ? {
            acknowledgedCount: 0,
            totalTargetCount: 160,
          }
        : undefined,
    };

    announcementsStore = [newAnnouncement, ...announcementsStore];

    return NextResponse.json({
      success: true,
      data: newAnnouncement,
    });
  } catch (error) {
    console.error("Error creating announcement API:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
