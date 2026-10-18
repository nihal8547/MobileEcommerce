import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const settings = await prisma.storeSettings.findUnique({ where: { id: "1" } });
    if (!settings) {
      return NextResponse.json({
        whatsappEnabled: true,
        whatsappNumber: "+97466000000",
        codEnabled: true,
        onlinePayEnabled: true,
        standardDeliveryQar: 15,
        expressDeliveryQar: 30,
        freeDeliveryAboveQar: 200,
        currency: "QAR",
      });
    }
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const settings = await prisma.storeSettings.upsert({
      where: { id: "1" },
      update: body,
      create: { id: "1", ...body },
    });
    return NextResponse.json(settings);
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
