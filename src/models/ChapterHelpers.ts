import { Chapter, iFork, Route } from '@/models/ServerModels';
import { v4 as uuidv4 } from 'uuid';

export function AddRouteToChapter(chapter: Chapter, route: Route): Chapter {
  if (chapter.routes.includes(route))
    throw new Error(
      "can't add a route to the chapter because it already has it."
    );

  const update: Chapter = { ...chapter, routes: [...chapter.routes, route] };
  return update;
}

export function CreateRoute(text: string = '', fork: iFork = null) {
  const r: Route = {
    fork,
    text,
    id: uuidv4(),
  };

  return r;
}
