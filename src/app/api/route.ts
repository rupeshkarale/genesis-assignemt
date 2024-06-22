import { NextRequest, NextResponse } from "next/server";

export type Content = {
  id: string;
  content: string;
};

let contentEntities: Content[] = [];

export async function POST(req: Request) {
  try {
    const newContent = await req.json();
    contentEntities.push(newContent);
    return NextResponse.json(contentEntities);
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
      return NextResponse.json(contentEntities);
    }
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json(
      { error: "Failed to fetch content" },
      { status: 500 },
    );
  }
}
