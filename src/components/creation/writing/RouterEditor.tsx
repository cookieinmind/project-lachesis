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

  //*Effects

  const SaveChangesRef = useRef<() => void>();
  SaveChangesRef.current = () => {
    if (!unsavedChanges) return;
    //!THE ORDER MATTERS
    console.log('[S] CALLING SERVER');
    setUnsavedChanges(false);
    saveChanges(routes);
  };

  useEffect(() => {
    if (!unsavedChanges) {
      return;
    }
    const saveChanges = SaveChangesRef.current;
    let wasSaved = false; //useState is not fast enough.
    console.log('[>] ENTERING EFFECT');
    let autoSaveTimer = setTimeout(() => {
      //check if there's been any changes
      if (unsavedChanges) {
        //if they are, save them
        saveChanges();
        wasSaved = true;
      }
    }, AUTOSAVE_DELAY * 1000);

    return () => {
      console.log('[<] EXITING EFFECT - Saved changes? :', wasSaved);
      clearTimeout(autoSaveTimer);
      //AND SAVE!
      if (wasSaved === false) {
        saveChanges();
      }
    };
  }, [SaveChangesRef, unsavedChanges]);

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
                  if (unsavedChanges === false) {
                    setUnsavedChanges(true);
                  }
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
