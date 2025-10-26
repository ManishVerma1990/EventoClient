import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Event {
  id?: string;
  title: string;
  startTime: string;
  endTime: string;
  capacity: number;
  price: number;
}

interface EventsState {
  events: Event[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
});

export const { setEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
