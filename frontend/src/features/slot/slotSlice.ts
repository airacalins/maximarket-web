import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../../app/api/agent";
import { ISlot } from "../../app/models/slot";
import { ITenant } from "../../app/models/tenant";

export interface ISlotState {
  slots: ISlot[];
  slot?: ISlot;
  isFetching: boolean;
  isFetchingDetails: boolean;
  isSaving: boolean;
  tenants: ITenant[];
}

const initialState: ISlotState = {
  slots: [],
  isFetching: false,
  slot: undefined,
  isFetchingDetails: false,
  isSaving: false,
  tenants: []
}

export const fetchSlotsAsync = createAsyncThunk<ISlot[]>(
  'slots/fetchSlotsAsync',
  async (_, thunkAPI) => {
    try {
      return await agent.Slot.list();
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchSlotDetailsAsync = createAsyncThunk<ISlot, string>(
  'slots/fetchSlotDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Slot.details(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const createSlotAsync = createAsyncThunk<ISlot, ISlot>(
  "slots/createSlotAsync", 
  async (slot, thunkAPI) => {
    try {
      return await agent.Slot.create(slot);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const updateSlotDetailsAsync = createAsyncThunk<ISlot, ISlot>(
  'slot/updateSlotDetailsAsync',
  async (slot, thunkAPI) => {
    try {
      return await agent.Slot.update(slot);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const deleteSlotDetailsAsync = createAsyncThunk<ISlot, string>(
  'slot/deleteSlotDetailsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Slot.delete(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const fetchSlotTanantsAsync = createAsyncThunk<ITenant[], string>(
  'slot/fetchSlotTanantsAsync',
  async (id, thunkAPI) => {
    try {
      return await agent.Tenant.slotTenants(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue({error: error.data})
    }
  }
)

export const slotSlice = createSlice({
  name: 'slot',
  initialState,
  reducers: {},

  extraReducers: (builder => {
    builder.addCase(fetchSlotsAsync.pending, (state, action) => {
      state.isFetching = true;
    });
    builder.addCase(fetchSlotsAsync.fulfilled, (state, action) => {
      state.slots = action.payload;
      state.isFetching = false;
    });
    builder.addCase(fetchSlotsAsync.rejected, (state, action) => {
      state.isFetching = false;
    });

    
    builder.addCase(fetchSlotDetailsAsync.pending, (state, action) => {
      state.isFetchingDetails = true;
    });
    builder.addCase(fetchSlotDetailsAsync.fulfilled, (state, action) => {
      state.slot = action.payload;
      state.isFetchingDetails = false;
    });
    builder.addCase(fetchSlotDetailsAsync.rejected, (state, action) => {
      state.isFetchingDetails = false;
    });


    builder.addCase(createSlotAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(createSlotAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(createSlotAsync.rejected, (state, action) => {
      state.isSaving = false;
    });
    
    
    builder.addCase(updateSlotDetailsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(updateSlotDetailsAsync.fulfilled, (state, action) => {
      state.slot = action.payload;
      state.isSaving = false;
    });
    builder.addCase(updateSlotDetailsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });

  
    builder.addCase(deleteSlotDetailsAsync.pending, (state, action) => {
      state.isSaving = true;
    });
    builder.addCase(deleteSlotDetailsAsync.fulfilled, (state, action) => {
      state.isSaving = false;
    });
    builder.addCase(deleteSlotDetailsAsync.rejected, (state, action) => {
      state.isSaving = false;
    });

    
    builder.addCase(fetchSlotTanantsAsync.pending, (state, action) => {
    });
    builder.addCase(fetchSlotTanantsAsync.fulfilled, (state, action) => {
      state.tenants = action.payload;
    });
    builder.addCase(fetchSlotTanantsAsync.rejected, (state, action) => {
    });
  })
})

export const {  } = slotSlice.actions;