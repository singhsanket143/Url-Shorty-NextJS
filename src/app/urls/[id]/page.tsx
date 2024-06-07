import { UrlShortenerService } from "@/services/UrlShortenerService";
import { redirect } from "next/navigation";

async function fetchOriginalUrl(url: string) {
    const urlService = new UrlShortenerService();
    const response = await urlService.getUrlByShortUrl(url);
    return response?.originalUrl;
}

export default async function urlRedirect({params}: {params: {id: string}}) {
    console.log(params.id);
    const original = await fetchOriginalUrl(`urls/${params.id}`);
    if(original)
        redirect(original);
    redirect('/404');
    return null;
}