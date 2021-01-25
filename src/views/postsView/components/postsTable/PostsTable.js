//@flow
import React, { Component } from "react";
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from "@material-ui/core";

type Props = {
  posts: { [key: string]: Post },
  loadPost: (id: string) => any,
  setPage: (page: number) => any,
  setPerPage: (perPage: number) => any,
  totalCount: number,
  page: number,
  perPage: number
};

class PostsTable extends Component<Props> {
  handleOnClick = (id: string) => {
    this.props.loadPost(id);
  };

  handleChangePage = (event: SyntheticInputEvent<*> | null, page: number) => {
    this.props.setPage(page);
  };

  handleChangeRowsPerPage = (event: SyntheticInputEvent<*>) => {
    this.props.setPerPage(parseInt(event.target.value, 10));
  };

  render() {
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Author ID</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Lead</TableCell>
              <TableCell>Content</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Updated</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.posts &&
              Object.keys(this.props.posts).map(key => {
                const n = this.props.posts[key];
                return (
                  <TableRow
                    key={n.id}
                    onClick={() => this.handleOnClick(n.id)}
                    hover={true}
                  >
                    <TableCell component="th" scope="row">
                      {n.id}
                    </TableCell>
                    <TableCell>{n.author_id}</TableCell>
                    <TableCell>{n.category_id}</TableCell>
                    <TableCell>{n.title.substr(0, 20)}</TableCell>
                    <TableCell>{n.lead.substr(0, 20)}</TableCell>
                    <TableCell>{n.content.substr(0, 30)}</TableCell>
                    <TableCell>{n.created_at}</TableCell>
                    <TableCell>{n.updated_at}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
        {this.props.totalCount && (
          <TablePagination
            component="div"
            count={this.props.totalCount}
            rowsPerPage={this.props.perPage}
            page={this.props.page}
            backIconButtonProps={{
              "aria-label": "Previous Page"
            }}
            nextIconButtonProps={{
              "aria-label": "Next Page"
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        )}
      </Paper>
    );
  }
}

export default PostsTable;
