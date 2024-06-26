import { createRouter, createWebHistory } from "vue-router";
import { useAlbumData } from "./Composables/useAlbumData";

import index from "./pages/home/index.vue";
import album from "./pages/album/index.vue";
import songs from "./pages/songs/index.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "Home",
            component: index,
        },
        {
            path: "/album",
            name: "album",
            component: album,
        },
        {
            path: "/songs",
            name: "songs",
            component: songs,
        },
    ],
});

router.beforeEach((to, from, next) => {

    const titleFromParams = to.query.title;
    let meta

    if (titleFromParams) meta = useAlbumData(titleFromParams);
    if (titleFromParams) {

        document.title = `NoteFest - ${titleFromParams}`;
        const ogImage = meta ? meta.image.replace("/public", "") : null;
        if (ogImage) {
            const existingMetaTag = document.querySelector('meta[property="og:image"]');
            const existingAppleTouchIconLink = document.querySelector('link[rel="apple-touch-icon"]');

            if (existingMetaTag) {
                existingMetaTag.setAttribute("content", ogImage);
            } else {
                const metaTag = document.createElement("meta");
                metaTag.setAttribute("property", "og:image");
                metaTag.setAttribute("content", ogImage);
                document.head.appendChild(metaTag);
            }

            if (existingAppleTouchIconLink) {
                existingAppleTouchIconLink.setAttribute("href", ogImage);
            } else {
                const appleTouchIconLink = document.createElement("link");
                appleTouchIconLink.setAttribute("rel", "apple-touch-icon");
                appleTouchIconLink.setAttribute("href", ogImage);
                document.head.appendChild(appleTouchIconLink);
            }
        }


    }
    else document.title = "NoteFest";

    next()
})

export default router;
