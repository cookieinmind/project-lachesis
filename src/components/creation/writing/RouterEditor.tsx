import { CreateRoute } from '@/models/ChapterHelpers';
import { Route } from '@/models/ServerModels';
import React, { useCallback, useEffect, useRef } from 'react';
import TextField from './TextField';

const dummyText =
  'Shallan, a minor lighteyed woman whose family and lands are in danger, hatches a daring plot to switch a broken Soulcaster (a device that allows people to change objects to other things) with a working one belonging to Jasnah Kholin, sister of the Alethi king.';

export default function RouterEditor({
  routes,
  addRoute,
  deleteRoute,
}: {
  routes: Route[];
  addRoute: (route: Route) => Promise<void>;
  deleteRoute: (route: Route) => Promise<void>;
}) {
  const createdOne = useRef<boolean>(false);

  const CreateAndFocus = useCallback(async () => {
    //Create a new route
    const newRoute: Route = CreateRoute();

    //added to the list
    await addRoute(newRoute);

    //make the app focus on the new component
  }, [addRoute]);

  useEffect(() => {
    if (routes.length === 0 && !createdOne.current) {
      createdOne.current = true;
      CreateAndFocus();
    }
  }, [routes, CreateAndFocus]);

  return (
    <div className="w-full" id="route editor">
      {routes.map((route, i) => {
        return (
          <TextField
            placeholder={'type here'}
            key={i}
            initialText={route.text}
            updateText={(text: string) => {
              //save the text inside the route obj
              route.text = text;
            }}
            createNewOne={CreateAndFocus}
          />
        );
        //TODO:
        /**
         * Move the portal to here and pass a method so that each TextField can call it with its params
         */
      })}
    </div>
  );
}
