import { CreateRoute } from '@/models/ChapterHelpers';
import { Route } from '@/models/ServerModels';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HoverMenu, iHoverMenuItem } from './HoverMenu';
import TextField from './TextField';

/**
 * In seconds*
 */
const AUTOSAVE_DELAY = 5;

const dummyText =
  'Shallan, a minor lighteyed woman whose family and lands are in danger, hatches a daring plot to switch a broken Soulcaster (a device that allows people to change objects to other things) with a working one belonging to Jasnah Kholin, sister of the Alethi king.';

interface iRouteEditorParams {
  routes: Route[];
  addRoute: (route: Route) => Promise<void>;
  deleteRoute: (route: Route) => Promise<void>;
  saveChanges: (routes: Route[]) => void;
  unsavedChanges: boolean;
  setUnsavedChanges: (newVal: boolean) => void;
}

export default function RouterEditor({
  routes,
  addRoute,
  deleteRoute,
  saveChanges,
  unsavedChanges,
  setUnsavedChanges,
}: iRouteEditorParams) {
  //*State
  const createdOne = useRef<boolean>(false);
  const [menuItems, setMenuItems] = useState<iHoverMenuItem[]>(undefined);

  //*Methods
  const CreateAndFocus = useCallback(async () => {
    //Create a new route
    const newRoute: Route = CreateRoute();

    //added to the list
    await addRoute(newRoute);

    //make the app focus on the new component
  }, [addRoute]);

  function OpenPortal(items: iHoverMenuItem[]) {
    setMenuItems(items);
  }

  function HidePortal() {
    setMenuItems(undefined);
  }

  function SaveChanges() {
    //!THE ORDER MATTERS
    saveChanges(routes);
    setUnsavedChanges(false);
  }

  //*Effects

  // useEffect(() => {
  //   if (routes.length === 0 && !createdOne.current) {
  //     createdOne.current = true;
  //     CreateAndFocus();
  //   }
  // }, [routes, CreateAndFocus]);

  useEffect(() => {
    if (!unsavedChanges) return;

    console.log('[ ] - timer start');
    let autoSaveTimer = window.setTimeout(() => {
      //check if there's been any changes
      if (unsavedChanges) {
        //if they are, save them
        SaveChanges();
      }
    }, AUTOSAVE_DELAY * 1000);

    return () => {
      console.log('[X] OUT OF AUTOSAVE EFFECT');
      window.clearTimeout(autoSaveTimer);
      //AND SAVE!
      if (unsavedChanges) SaveChanges();
    };
  }, [saveChanges, unsavedChanges]);

  return (
    <div className="relative w-full">
      <div className="w-full" id="route editor">
        {routes.map((route, i) => {
          return (
            <TextField
              placeholder={'type here'}
              key={i}
              initialText={route.text}
              updateText={(text: string) => {
                //compare new vs old text!
                if (route.text !== text) {
                  route.text = text;
                  setUnsavedChanges(true);
                }
              }}
              createNewOne={CreateAndFocus}
              openPortal={OpenPortal}
              hidePortal={HidePortal}
            />
          );
        })}
      </div>

      {/* HERE */}
      <HoverMenu menuItems={menuItems} hide={HidePortal} />
    </div>
  );
}
