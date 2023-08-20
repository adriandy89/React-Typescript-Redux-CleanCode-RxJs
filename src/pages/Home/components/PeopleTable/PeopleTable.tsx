import { Person } from "@/models";
import { addFavorites } from "@/redux/states";
import { AppStore } from "@/redux/store";
import { Checkbox } from "@mui/material";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface IPeopleTableProps {}

const PeopleTable: React.FC<IPeopleTableProps> = () => {
  const [selectedPeople, setSelectedPeople] = React.useState<Person[]>([]);
  const dispatch = useDispatch();
  const statePeople = useSelector((store: AppStore) => store.people);
  const favoritePeople = useSelector((store: AppStore) => store.favorites);
  
  const findPerson = (person: Person) => !!favoritePeople.find((p) => person.id === p.id);
  const filterPerson = (person: Person) => favoritePeople.filter((p) => person.id !== p.id);

  const handleChange = (person: Person) => {
    const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person];
    dispatch(addFavorites(filteredPeople));
    setSelectedPeople(filteredPeople);
  };

  const columns = [
    {
      field: "action",
      type: "actions",
      sortable: false,
      headerName: "",
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <>
          {
            <Checkbox
              size="small"
              checked={findPerson(params.row)}
              onChange={() => handleChange(params.row)}
            />
          }
        </>
      ),
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "category",
      headerName: "Categories",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
    {
      field: "company",
      headerName: "Companies",
      flex: 1,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => <>{params.value}</>,
    },
  ];

  useEffect(() => {
    setSelectedPeople(favoritePeople);
  }, [favoritePeople]);
  return (
    <>
      <DataGrid
        rows={statePeople}
        columns={columns}
        disableColumnSelector
        disableRowSelectionOnClick
        autoHeight
        pageSizeOptions={[5]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowId={(row) => row.id}
      />
    </>
  );
};

export default PeopleTable;
