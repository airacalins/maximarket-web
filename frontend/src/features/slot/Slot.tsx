import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelecter } from "../../app/store/configureStore";
import { fetchSlotsAsync } from "./slotSlice";
import history from '../../app/utils/history';

import { Label } from 'semantic-ui-react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';

import LoadingComponent from "../../app/layouts/components/loading/LoadingComponent";
import MainPage from "../../app/layouts/components/pages/MainPage";
import CustomTable from "../../app/layouts/components/table/CustomTable";
import { currencyFormatter } from "../../app/layouts/formatter/common";

const Slot = () => {
  const [searchKey, setSearchKey] = useState('');
  const { slots, isFetching: isFetchingSlots } = useAppSelecter(state => state.slot);

  const dispatch = useAppDispatch();

  const data = useMemo(() => {
    if (!!searchKey) {
      return slots.filter(i => i.slotNumber.toLowerCase().includes(searchKey.toLowerCase()));
    }
    return slots;
  }, [slots, searchKey])

  useEffect(() => {
    dispatch(fetchSlotsAsync());
  }, [])

  const columns = [
    { title: 'Slot Number' },
    { title: 'Size' },
    { title: 'Rental Fee' },
    { title: 'Status' },
    { title: '' },
  ]

  if (isFetchingSlots) return <LoadingComponent content="Loading Slots..." />

  return (
    <MainPage
      title="Slots"
      content={
        <CustomTable
          searchValue={searchKey}
          onSearch={(value: string) => setSearchKey(value)}
          buttonTitle="Add Slot"
          navigateTo="/slots/create"
          columns={columns}
          rows=
          {
            !data.length ?
              [
                <TableRow>
                  <TableCell align="center" colSpan={columns.length}>
                    No data
                  </TableCell>
                </TableRow>
              ]
              :
              data.map(slot =>
                <TableRow key={slot.id}>

                  <TableCell align="center">
                    {slot.slotNumber}
                  </TableCell>

                  <TableCell align="center">
                    {slot.size}
                  </TableCell>

                  <TableCell align="center">
                    {currencyFormatter(slot.price!)}
                  </TableCell>

                  <TableCell align="center">
                    <Label content={slot.tenantContract ? "Rented" : "Available"} color={slot.tenantContract ? "blue" : "green"}></Label>
                  </TableCell>

                  <TableCell align="right">
                    <NavigateNextOutlinedIcon onClick={() => history.push(`/slots/${slot.id}/details`)} />
                  </TableCell>

                </TableRow>
              )
          }
        />
      }
    />
  )
}


export default Slot;