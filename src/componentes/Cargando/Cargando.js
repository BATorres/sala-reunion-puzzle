import React, {Component} from 'react';
import { css } from "@emotion/core";
import {BeatLoader} from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

class Spinner extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    render() {
        return(
            <BeatLoader
                css={override}
                size={150}
                color={"#36D7B7"}
                loading={this.state.loading}
            />
        )
    }
}

export default Spinner;