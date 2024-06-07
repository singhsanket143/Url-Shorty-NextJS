import UrlRepository from "@/repositories/UrlRepository";
import shortId from 'shortid';
export class UrlShortenerService {
    private urlRepository;
    constructor() {
        this.urlRepository = new UrlRepository();
    }

    async shortenUrl(originalUrl?: string) : Promise<string> {
        if(!originalUrl) {
            return "";
        }
        let url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
        if(url) {
            return url.shortUrl;
        }
        let shortUrl = shortId();
        url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        while(url) {
            shortUrl = shortId();
            url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        }

        await this.urlRepository.createUrl(originalUrl, `urls/${shortUrl}`);
        return shortUrl;
    }

    async getAllUrls() {
        return await this.urlRepository.getAllUrls();
    }

    async getUrlByShortUrl(shortUrl: string) {
        return await this.urlRepository.getUrlByShortUrl(shortUrl);
    }

    // TODO 
}