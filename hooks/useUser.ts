import { useAppSelector } from "./useAppSelector";

function useUser() {
  const { user } = useAppSelector((state) => state.auth);

  return user;
}

export default useUser;
