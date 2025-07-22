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

    handler: async () => {
        // const { user, repo = 'RSSHub' } = ctx.req.param();

        let url = `https://sfmcompile.club/`;
        url = 'http://localhost:8000/sfm.html';
        // const response = await ofetch(`https://sfmcompile.club/`);
        const response = await ofetch(url);
        const $ = load(response);

        const items = $('.g1-collection-item')
            .toArray()
            .map((item) => {
                const it = $(item);
                const title = it.find('.entry-title').children().first();
                const href = title.attr('href');
                const titleTxt = title.text();
                const img = it.find('.mejs-poster-img').attr('src');
                const cat = it.find('.entry-categories-inner').children();
                const stats = it.find('.entry-stats');

                return {
                    title: titleTxt,
                    link: href,
                    guid: href,
                    // image: img,
                    pubDate: parseDate(new Date().toISOString()),
                    author: 'NA',
                    description: `<img src='${img}'></img> ${cat} ${stats}`,
                    // description: `<![CDATA[ <img src='${img}'></img> ${cat} ${stats} ]]>`,
                    // content: {
                    //     html: `<img src=${img}></img> ${cat} ${stats}`,
                    //     text: html,
                    // },
                };
            });

        return {
            // channel title
            title: `SFMCompile.club`,
            // channel link
            link: `https://sfmcompile.club/`,
            // each feed item
            item: items,
        };
    },
};
