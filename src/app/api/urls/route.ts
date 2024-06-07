import { UrlShortenerService } from "@/services/UrlShortenerService";
import { NextResponse } from "next/server";
import { cache } from "react";

const fetchUrls = async () => {
    const shortenerService = new UrlShortenerService();
    const response = await shortenerService.getAllUrls();
    return response;
}

export async function GET() {
    const urls = await fetchUrls();
    const response = NextResponse.json({urls})
    response.headers.set('Cache-Control', 'public, max-age=180, s-maxage=180, stale-while-revalidate=59');
    return response;
}