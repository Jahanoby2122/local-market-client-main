import { useQuery } from '@tanstack/react-query';
import UseAxiosSecure from './UseAxiosSecure';
import UseAuth from './UseAuth';

const useUserRole = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    data: role = 'user', // default role
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    queryKey: ['userRole', user?.email?.toLowerCase()],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const email = user.email.toLowerCase(); // case-insensitive match
      const res = await axiosSecure.get(`/users/${email}/role`); // 👈 correct route
      return res.data.role;
    },
  });

  return { role, roleLoading, refetch };
};

export default useUserRole;
