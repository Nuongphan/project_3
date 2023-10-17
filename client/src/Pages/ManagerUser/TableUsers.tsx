import axios from "axios";
import React, { useEffect, useState } from "react";

const TableUsers = () => {
  const [userList, setUserList] = useState<
    {
      id: Number;
      firstName: String;
      lastName: String;
      email: string;
      member: string;
      dob: string;
      status: boolean;
    }[]
  >([]);

  const handleGetDataa = () => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => setUserList(response.data));
  };
  const [searchInput, setSearchInput] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }
  const handleChangeStatus = (id: any) => {
    const userToUpdate = userList.find((user) => user.id === id);
    if (!userToUpdate) {
      console.error("Không tìm thấy người dùng");
      return;
    }
    userToUpdate.status = !userToUpdate.status;
    const updatedUserList = userList.map((user) =>
      user.id === id ? userToUpdate : user
    );
    setUserList(updatedUserList);
    axios.patch(`http://localhost:8080/users/${id}`, {
      status: !userToUpdate.status,
    });
    console.log("Updated user", userToUpdate);
  };

  useEffect(() => {
    const searchResult = userList.filter((item) => {
      return (
        item.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
        item.member.toLowerCase().includes(searchInput.toLowerCase())
      );
    });
    if (searchInput.length === 0) {
      handleGetDataa();
    } else {
      setUserList(searchResult);
    }
  }, [searchInput]);
  return (
    <>
      <div className="pb-4 bg-white dark:bg-gray-900 search ">
        <label htmlFor="table-search" className="sr-only ">
          Search
        </label>
        <div className="relative mt-1 ml-30px">
          <div className="absolute inset-y-0  left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={searchInput}
            onChange={handleChange}
            type="text"
            id="table-search"
            className="block p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search "
          />
        </div>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg tableUser">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-2">
                #
              </th>
              <th scope="col" className="px-4 py-3">
                Name
              </th>
              <th scope="col" className="px-4 py-3">
                Email
              </th>
              <th scope="col" className="px-4 py-3">
                Member
              </th>
              <th scope="col" className="px-4 py-3">
                DOB
              </th>
              <th scope="col" className="px-4 py-3">
                Action
              </th>
              <th scope="col" className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item, index) => (
              <tr
                key={String(item.id)}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="w-4 p-4">{index + 1}</td>
                <th
                  scope="row"
                  className="px-4 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.firstName} {item.lastName}
                </th>
                <td className="px-4 py-4">{item.email}</td>
                <td className="px-4 py-4">{item.member}</td>
                <td className="px-4 py-4">{item.dob}</td>
                <td
                  style={{ display: "flex", gap: "5px" }}
                  className="px-4 py-5"
                >
                  <span
                    style={{ marginTop: "5px" }}
                    className={`${
                      item.status ? "green" : "bg-red-500"
                    } w-2 h-2 rounded inline-block mr-1 `}
                  ></span>
                  <span> {item.status ? "active" : "inactive"}</span>
                </td>
                <td className="px-4 py-4">
                  <button
                    style={{
                      backgroundColor: "#333",
                      border: "none",
                      borderRadius: "4px",
                      padding: "6px",
                      color: "#fff",
                    }}
                    onClick={() => handleChangeStatus(item.id)}
                  >
                    Change
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableUsers;
