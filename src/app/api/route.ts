import {  getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export type Content = {
  id: string;
  email: string;
  content: string;
};

let contentEntities: Content[] = [];

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session?.user) {
    return NextResponse.json(
      { error: "Please log in to create a note." },
      { status: 401 },
    );
  }
  try {
    const newContent = await req.json();
    contentEntities.push({ ...newContent, email: session.user.email });
    return NextResponse.json(contentEntities, { status: 201 });
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json(
      { error: "Failed to add content" },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { id, content } = await req.json();
    const contentEntity = contentEntities.find((entity) => entity.id === id);

    if (contentEntity) {
      contentEntity.content = content;
      return NextResponse.json(contentEntity);
    } else {
      return NextResponse.json(
        { error: `Content with ID ${id} not found` },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error in PUT request:", error);
    return NextResponse.json(
      { error: "Failed to update content" },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const session = await getServerSession();

  if (!session?.user) {
    return NextResponse.json([]);
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const contentEntity = contentEntities.find((entity) => entity.id === id);
      if (contentEntity) {
        return NextResponse.json(contentEntity);
      } else {
        return NextResponse.json(
          { error: `Content with ID ${id} not found` },
          { status: 404 },
        );
      }
    } else {
      return NextResponse.json(
        contentEntities.filter(({ email }) => email === session.user?.email),
      );
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Missing ID parameter in DELETE request" },
        { status: 400 },
      );
    }
    const deletedEntity = contentEntities.find((entity) => entity.id === id);

    if (!deletedEntity) {
      return NextResponse.json(
        { error: `Content with ID ${id} not found` },
        { status: 404 },
      );
    }

    contentEntities = contentEntities.filter((entity) => entity.id !== id);

    return NextResponse.json(deletedEntity);
  } catch (error) {
    console.error("Error in DELETE request:", error);
    return NextResponse.json(
      { error: "Failed to delete content" },
      { status: 500 },
    );
  }
}
