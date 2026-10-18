import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      addressData,
      items,
      paymentMethod,
      deliveryType,
      subtotalQar,
      deliveryFeeQar,
      totalQar,
      couponId,
      notes,
    } = body;

    // Upsert address
    const address = await prisma.address.create({
      data: {
        userId,
        fullName: addressData.fullName,
        phone: addressData.phone,
        line1: addressData.line1,
        line2: addressData.line2,
        area: addressData.area,
        city: "Doha",
        country: "Qatar",
      },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId,
        addressId: address.id,
        couponId: couponId || null,
        paymentMethod,
        deliveryType,
        subtotalQar,
        deliveryFeeQar,
        totalQar,
        notes,
        estimatedDelivery: deliveryType === "EXPRESS"
          ? new Date(Date.now() + 24 * 60 * 60 * 1000)
          : new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        items: {
          create: items.map((item: { name: string; imageUrl?: string; priceQar: number; quantity: number; variant?: string; productId: string }) => ({
            productId: item.productId,
            name: item.name,
            imageUrl: item.imageUrl,
            priceQar: item.priceQar,
            quantity: item.quantity,
            variant: item.variant,
          })),
        },
      },
      include: { items: true, address: true },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
