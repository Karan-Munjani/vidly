import React, { Component } from "react";
import _ from "lodash";
class TableBody extends Component {
  renderCell = (item, column) => {
    //if column has content property render this
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;

    return (
      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            {columns.map((column) => (
              /*here item is distinct movie object from movies,
              So to load cell data we will use item[column.path] which will be :
              item[title]
              item[numberInStock] etc....
              But
              item[genre.name] can't be accessed by [] brackets cause its a nested object
              so use Loadash*/

              <td key={column.path || column.key}>
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
