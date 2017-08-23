/**
 * Created by Jeepeng on 2016/11/20.
 */

import React, { Component, PropTypes } from 'react'
import {
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native'

const DEFAULT_HEIGHT = 240;
const DEFAULT_COLUMN_WIDTH = 60;
const DEFAULT_HEADER_BACKGROUND_COLOR = '#acdae7';
const DEFAULT_HEADER_TEXT_COLOR = '#000000';
const DEFAULT_BORDER_COLOR = '#dfdfdf';
const DEFAULT_ROW_BACKGROUND_COLOR = '#fbfbfb';
const DEFAULT_BORDER_WIDTH = 1;

class Table extends Component {

  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      dataIndex: PropTypes.string.isRequired,
      width: PropTypes.number
    })).isRequired,
    columnWidth: PropTypes.number,
    height: PropTypes.number,
    dataSource: React.PropTypes.array.isRequired,
    renderCell: React.PropTypes.func,
    headerBackgroundColor: React.PropTypes.string,
    headerTextColor: React.PropTypes.string,
    tableBorderColor: React.PropTypes.string,
    rowBackgroundColor: React.PropTypes.string,
    tableBorderWidth: React.PropTypes.number
  };

  static defaultProps = {
    columns: [],
    dataSource: [],
    columnWidth: DEFAULT_COLUMN_WIDTH,
    height: DEFAULT_HEIGHT,
    renderCell: undefined,
    headerBackgroundColor: DEFAULT_HEADER_BACKGROUND_COLOR,
    headerTextColor: DEFAULT_HEADER_TEXT_COLOR,
    tableBorderColor: DEFAULT_BORDER_COLOR,
    rowBackgroundColor: DEFAULT_ROW_BACKGROUND_COLOR,
    tableBorderWidth: DEFAULT_BORDER_WIDTH
  };

  _renderCell(cellData, col, index) {
    let { tableBorderColor, tableBorderWidth } = this.props
    let style = {
      width: col.width || this.props.columnWidth || DEFAULT_COLUMN_WIDTH,
      borderRightColor: tableBorderColor || DEFAULT_BORDER_COLOR,
      borderRightWidth: tableBorderWidth || DEFAULT_BORDER_WIDTH
    };
    if(index === 0) {
      style["borderLeftWidth"] = tableBorderWidth || DEFAULT_BORDER_WIDTH;
      style["borderLeftColor"] = tableBorderColor || DEFAULT_BORDER_COLOR;
    }
    return (
      <View key={col.dataIndex} style={[styles.cell, style]}>
        <Text>{cellData}</Text>
      </View>
    )
  }

  _renderHeader() {
    let { columns, columnWidth, headerBackgroundColor, headerTextColor, tableBorderColor, tableBorderWidth } = this.props;
    return columns.map((col, index) => {
      let style = {
        width: col.width || columnWidth || DEFAULT_COLUMN_WIDTH,
        backgroundColor: headerBackgroundColor || DEFAULT_HEADER_BACKGROUND_COLOR,
        borderRightColor: tableBorderColor || DEFAULT_BORDER_COLOR,
        borderRightWidth: tableBorderWidth || DEFAULT_BORDER_WIDTH,
        borderBottomWidth: tableBorderWidth || DEFAULT_BORDER_WIDTH,
        borderBottomColor: tableBorderColor || DEFAULT_BORDER_COLOR,
        borderTopWidth: tableBorderWidth || DEFAULT_BORDER_WIDTH,
        borderTopColor: tableBorderColor || DEFAULT_BORDER_COLOR,
      };
      let textStyle = { color: headerTextColor || DEFAULT_HEADER_TEXT_COLOR }
      if(index === 0) {
        style["borderLeftWidth"] = tableBorderWidth || DEFAULT_BORDER_WIDTH;
        style["borderLeftColor"] = tableBorderColor || DEFAULT_BORDER_COLOR;
      }
      return (
        <View key={index} style={[styles.headerItem, style]}>
          <Text style = {[styles.headerText, textStyle]}>{col.title}</Text>
        </View>
      )
    })
  }

  _renderRow(rowData, index) {
    let { columns, renderCell, tableBorderColor, tableBorderWidth , rowBackgroundColor} = this.props;
    let style = {
      borderBottomColor: tableBorderColor || DEFAULT_BORDER_COLOR,
      backgroundColor: rowBackgroundColor || DEFAULT_ROW_BACKGROUND_COLOR,
      borderBottomWidth: tableBorderWidth || DEFAULT_BORDER_WIDTH,
    };
    if(!renderCell) {
      renderCell = this._renderCell.bind(this, );
    }
    return (
      <View key={index} style={[styles.row, style]}>
        {
          columns.map((col, index) => renderCell(rowData[col.dataIndex], col, index))
        }
      </View>
    );
  }

  render() {
    let { dataSource, height } = this.props;
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={[styles.contentContainer , { height }]}
        horizontal={true}
        bounces={false} >
        <View>
          <View style={styles.header}>
            { this._renderHeader() }
          </View>
          <ScrollView
            style={styles.dataView}
            contentContainerStyle={styles.dataViewContent} >
            { dataSource.map((rowData, index) => this._renderRow(rowData, index)) }
          </ScrollView>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  contentContainer: {
    height: 240
  },
  header: {
    flexDirection: 'row',
  },
  headerText: {
    fontWeight: 'bold',
    color: DEFAULT_HEADER_TEXT_COLOR
  },
  headerItem: {
    minHeight: 30,
    width: DEFAULT_COLUMN_WIDTH,
    backgroundColor: DEFAULT_HEADER_BACKGROUND_COLOR,
    borderRightWidth: DEFAULT_BORDER_WIDTH,
    borderRightColor: DEFAULT_BORDER_COLOR,
    borderBottomWidth: DEFAULT_BORDER_WIDTH,
    borderBottomColor: DEFAULT_BORDER_COLOR,
    borderTopWidth: DEFAULT_BORDER_WIDTH,
    borderTopColor: DEFAULT_BORDER_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dataView: {
    flexGrow: 1,
  },
  dataViewContent: {
  },
  row: {
    flexDirection: 'row',
    backgroundColor: DEFAULT_ROW_BACKGROUND_COLOR,
    borderBottomWidth: DEFAULT_BORDER_WIDTH,
    borderBottomColor: DEFAULT_BORDER_COLOR,
  },
  cell: {
    minHeight: 25,
    width: DEFAULT_COLUMN_WIDTH,
    backgroundColor: 'transparent',
    borderRightWidth: DEFAULT_BORDER_WIDTH,
    borderRightColor: DEFAULT_BORDER_COLOR,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Table
