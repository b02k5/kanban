import React, { PureComponent } from "react";
import styled from "styled-components";

const Textarea = styled.textarea``;

interface IProps {
  maxRows: number;
  lineHeight: number;
  refTextarea: React.RefObject<HTMLTextAreaElement>;
  value: string;
  elementId: number;
  style: any;
  placeholder: string;
  onChange: (...args: any) => void;
}

interface IState {
  rows: number;
  minRows: number;
  maxRows: number;
}

export default class ResizableTextarea extends PureComponent<IProps, IState> {
  public state = {
    rows: 1,
    minRows: 1,
    maxRows: this.props.maxRows
  };

  private handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onChange(event, this.props.elementId);

    const { minRows, maxRows } = this.state;
    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~(event.target.scrollHeight / this.props.lineHeight);

    currentRows === previousRows && (event.target.rows = currentRows);

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    this.setState({
      rows: currentRows < maxRows ? currentRows : maxRows
    });
  };

  render() {
    const { rows } = this.state;
    const { value, placeholder, style, refTextarea } = this.props;
    return (
      <Textarea
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={this.handleChange}
        as={style}
        ref={refTextarea}
      />
    );
  }
}
