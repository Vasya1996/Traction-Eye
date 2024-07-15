import { RouteComponentProps } from 'react-router';

interface ScrollToTopProps extends RouteComponentProps<any> {}


const ScrollToTopOnMount: React.FC<ScrollToTopProps> = ({ history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return null;
};

export default withRouter(ScrollToTopOnMount);