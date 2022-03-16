import ReactDOM from 'react-dom';

export default function registerMicroComponent(
  microComponentName: string,
  MicroComponent: React.ComponentType<any>
) {
  // eslint-disable-next-line functional/immutable-data
  (window as any)[`render${microComponentName}`] = (
    containerId: string,
    history: History,
    props: any
  ) => {
    ReactDOM.render(
      <MicroComponent history={history} {...props} />,
      document.getElementById(containerId)
    );
  };

  // eslint-disable-next-line functional/immutable-data
  (window as any)[`unmount${microComponentName}`] = (containerId: string) => {
    const node = document.getElementById(containerId);
    if (node) {
      ReactDOM.unmountComponentAtNode(node);
    }
  };
}
