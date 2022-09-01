import { Me } from "api/queries";
import Loader from "app/components/Loader";
import i18next from "libs/i18n";
import { useQuery } from "react-query";

const withCurrentUser = (Component) => (props) => {
  const { isLoading, error, data } = useQuery("Me", Me, {
    retry: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <Component user={null} isAuthenticated={false} {...props} />;
  }

  i18next.changeLanguage(data.data.language);
  return <Component user={data.data} isAuthenticated {...props} />;
};

export default withCurrentUser;
