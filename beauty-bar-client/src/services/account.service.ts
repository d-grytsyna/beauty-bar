import api from "./api";
const getAccounts = () =>{
    return api.get("/admin/account");
  }

  const updateRole = (data: ChangeRoleRequest) =>{
    return api.put("/admin/account", data);
  }

  const deleteAccount = (id: number) =>{
    return api.delete("/admin/account/" + id);
  }
  const AccountService = {
    getAccounts,
    updateRole,
    deleteAccount
  };
  export default AccountService;