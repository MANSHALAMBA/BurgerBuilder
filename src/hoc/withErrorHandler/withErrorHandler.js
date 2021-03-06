import React, { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.reqIntercetor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resIntercetor = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }
    state = {
      error: null
    };

    // componentDidMount() {
    //   axios.interceptors.request.use(req => {
    //     this.setState({ error: null });
    //     return req;
    //   });

    //   axios.interceptors.response.use(
    //     res => res,
    //     error => {
    //       this.setState({ error: error });
    //     }
    //   );
    // }

    //ejecting interceptors that are required no more
    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqIntercetor);
      axios.interceptors.response.eject(this.resIntercetor);
    }

    errorDismissHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Aux>
          <WrappedComponent {...this.props} />
          <Modal show={this.state.error} modalClosed={this.errorDismissHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
