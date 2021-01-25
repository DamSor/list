//@flow
import React, { Component } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";

type Props = {
  loadPosts: string => any,
  categories: { [key: string]: Category }
};

class CategoriesTable extends Component<Props> {
  handleOnClick = (id: string) => {
    this.props.loadPosts(id);
  };

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.categories &&
              Object.keys(this.props.categories).map(key => {
                const n = this.props.categories[key];
                return (
                  <TableRow
                    key={n.id}
                    onClick={() => this.handleOnClick(n.id)}
                    hover={true}
                  >
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell>{n.name}</TableCell>
                    <TableCell>{n.created_at}</TableCell>
                    <TableCell>{n.updated_at}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default CategoriesTable;
