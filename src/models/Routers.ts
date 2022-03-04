export enum MainRoutes {
  create = '/dashboard/create',
  dashboard = '/dashboard',
  home = '/',
}

export enum DashboardRoutes {
  Dashboard = '/dashboard',
  Create = '/dashboard/create',
}

export function GetChapterRoute(chapter_id: string, story_id: string) {
  return `${DashboardRoutes.Dashboard}/${story_id}/${chapter_id}`;
}

export function GetStoryRoute(story_id: string) {
  return `${DashboardRoutes.Dashboard}/${story_id}`;
}
