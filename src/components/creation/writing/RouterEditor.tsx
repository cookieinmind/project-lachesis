import { Route } from '@/models/ServerModels';
import React, { useCallback, useEffect, useRef } from 'react';
import TextField from './TextField';

const dummyText =
  'Shallan, a minor lighteyed woman whose family and lands are in danger, hatches a daring plot to switch a broken Soulcaster (a device that allows people to change objects to other things) with a working one belonging to Jasnah Kholin, sister of the Alethi king.';

export default function RouterEditor({
  routes,
  addRoute,
  deleteRoute,
  chapter_id,
}: {
  routes: Route[];
  addRoute: (route: Route) => Promise<void>;
  deleteRoute: (route: Route) => Promise<void>;
  chapter_id: string;
}) {
  const createdOne = useRef<boolean>(false);

  const CreateAndFocus = useCallback(async () => {
    //Create a new route
    const newRoute: Route = {
      chapter_id: chapter_id,
      text: '',
      fork: null,
    };

    //added to the list
    await addRoute(newRoute);

    //make the app focus on the new component
  }, [addRoute, chapter_id]);

  useEffect(() => {
    console.log(routes);
    if (routes.length === 0 && !createdOne.current) {
      createdOne.current = true;
      console.log('decided to create one');
      CreateAndFocus();
    }
  }, [routes, CreateAndFocus]);

  return (
    <div className="w-full">
      {routes.map((route, i) => {
        return (
          <TextField
            placeholder={'type here'}
            key={i}
            initialText={route.text}
            updateText={(text: string) => {
              //save the text inside the route obj
              route.text = text;
              console.log(route);
            }}
            onEnter={CreateAndFocus}
          />
        );
      })}
    </div>
  );
}
