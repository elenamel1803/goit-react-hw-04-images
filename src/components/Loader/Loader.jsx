import { Vortex } from 'react-loader-spinner';
import { LoadWrap } from './Loader.styled';

const Loader = () => {
  return (
    <LoadWrap>
      <Vortex
        visible={true}
        height="80"
        width="80"
        ariaLabel="vortex-loading"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </LoadWrap>
  );
};

export default Loader;
