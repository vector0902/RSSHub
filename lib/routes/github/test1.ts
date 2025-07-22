import { Route } from '@/types';
import ofetch from '@/utils/ofetch';
import { load } from 'cheerio';
import { parseDate } from '@/utils/parse-date';

export const route: Route = {
    path: '/test1',
    // categories: ['programming'],
    // example: '/github/issue/vuejs/core/all/wontfix',
    // parameters: { user: 'GitHub username', repo: 'GitHub repo name', state: 'the state of the issues. Can be either `open`, `closed`, or `all`. Default: `open`.', labels: 'a list of comma separated label names' },
    features: {
        requireConfig: false,
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    // radar: [
    //     {
    //         source: ['github.com/:user/:repo/issues', 'github.com/:user/:repo/issues/:id', 'github.com/:user/:repo'],
    //         target: '/issue/:user/:repo',
    //     },
    // ],
    name: 'Test1',
    // maintainers: ['HenryQW', 'AndreyMZ'],

    handler: (ctx) => {
        const { user, repo = 'RSSHub' } = ctx.req.param();

        // const response = await ofetch(`https://sfmcompile.club/`);
        const response = ofetch(`https://sfmcompile.club/`);
        const $ = load(response);

        console.log($);

    },

};
