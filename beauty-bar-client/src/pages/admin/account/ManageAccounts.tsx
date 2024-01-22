import { useEffect, useState } from "react";
import AccountService from "../../../services/account.service";
import { useHistory } from "react-router-dom";
import { Loading } from "../../../utils/Loading";
import TokenService from "../../../services/token.service";

export const ManageAccounts = () => {
  const [accounts, setAccounts] = useState<AccountInfoModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [searchTerm, setSearchTerm] = useState("");
  const [reload, setReload] = useState(true);
  const [deleteAccount, setDeleteAccount] = useState(false);
  const currentUser = TokenService.getUserEmail();
  useEffect(() => {
    AccountService.getAccounts().then(
      (response) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setAccounts(response.data);
        setIsLoading(false);
      },
      (error) => {
        history.push("/error");
      }
    );
  }, [reload, deleteAccount]);
  const changeAccRole = async (idAcc: number, adminAcc: boolean) => {
    const shouldChangeRole = window.confirm(
      "Are you sure you want to set this account new role? "
    );
    let accountInfo = {
      id: idAcc,
      admin: adminAcc,
    };
    if (shouldChangeRole) {
      try {
        await AccountService.updateRole(accountInfo);
        alert("Role was updated");
        setReload(!reload);
      } catch (apiError: any) {
        if (apiError?.response?.status) {
          const statusCode = apiError.response.status;
          switch (statusCode) {
            case 400:
              alert("Invalid data is being added.");
              break;
            case 401:
              alert("Authorization token ended please sign in");
              break;
            default:
              alert("An error occurred while adding the procedure.");
          }
        } else {
          alert("An error occurred while adding the procedure.");
        }
      }
    }
  };

  const deleteAccountFunc = async (
    id: number,
    name: string,
    surname: string
  ) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this account: " +
        name +
        " " +
        surname +
        "?"
    );

    if (shouldDelete) {
      await AccountService.deleteAccount(id);
      setDeleteAccount(!deleteAccount);
    }
  };
  if (isLoading) {
    return <Loading></Loading>;
  }

  const filteredAccounts = accounts.filter(
    (account) =>
      account?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account?.surname?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-6 m-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search accounts..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="scrollable-container mb-5 m-3">
      {searchTerm === "" ? (
        accounts.length > 0 ? (
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>Tel</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.tel}</td>
                  <td>{account.name}</td>
                  <td>{account.surname}</td>
                  <td>{account.email}</td>
                  <td>
                    {account.email !== currentUser && (
                      <>
                        <button
                          className="btn accent-btn main-btn"
                          onClick={() =>
                            changeAccRole(account.id, account.admin)
                          }
                        >
                          Set{" "}
                          {account.admin === true
                            ? " User role"
                            : " Admin role"}
                        </button>

                        {!account.admin && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            fill="currentColor"
                            className="bi bi-trash3 m-3"
                            viewBox="0 0 16 16"
                            onClick={() =>
                              deleteAccountFunc(
                                account.id,
                                account.name,
                                account.surname
                              )
                            }
                            style={{ cursor: "pointer" }}
                          >
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                          </svg>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No accounts available</p>
        )
      ) : filteredAccounts.length > 0 ? (
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Tel</th>
              <th>Name</th>
              <th>Surname</th>
              <th>Email</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {filteredAccounts.map((account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.tel}</td>
                <td>{account.name}</td>
                <td>{account.surname}</td>
                <td>{account.email}</td>
                <td>
                  <button
                    className="btn accent-btn main-btn "
                    onClick={() => changeAccRole(account.id, account.admin)}
                  >
                    Set {account.admin == true ? " User role" : " Admin role"}
                  </button>

                  {!account.admin && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      className="bi bi-trash3 m-3"
                      viewBox="0 0 16 16"
                      onClick={() =>
                        deleteAccountFunc(
                          account.id,
                          account.name,
                          account.surname
                        )
                      }
                      style={{ cursor: "pointer" }}
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No accounts found</p>
      )}
      </div>

    </div>
  );
};
