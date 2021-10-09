import React, { useState, useEffect } from 'react';
import TableHeaderItem from '../TableHeaderItem';

const Table = (props) => {

    let { columns, data, BodyClass, HeaderClass, tableClass, useBody, useChildren, children,
        callback, sort_by, sort_field, onClickHeader } = props

    const [showTableBody, setTableBody] = useState(useBody ? useBody : !useChildren ? true : false)
    const [showChildren, setShowChildren] = useState(useChildren ? useChildren : false)

    useEffect(() => {
        if (children) {
            setShowChildren(true)
            setTableBody(false)
        }
    }, [children])

    const renderTableHeader = () => {
        return columns && columns.map((items, idx) => {
            let show = null
            if (items.show === undefined) show = true
            else show = items.show
            if (show) {
                if (items.sortable === true) {
                    return <TableHeaderItem
                        key={items.name ? items.name : items.label}
                        table_width={items.width}
                        label={items.label.toUpperCase()}
                        name={items.name ? items.name : items.label}
                        tableColumnClick={onClickHeader}
                        sort_by={sort_by}
                        sort_field={sort_field}
                        align={items.alignment}
                    />
                } else {
                    if (typeof items === 'object') {
                        return <th key={idx} width={items.width} style={items.alignment && { textAlign: items.alignment }}>{items.label ? items.label.toUpperCase() : items.name && items.name.replace(/_/g, " ").toUpperCase()}</th>
                    }
                    else return <th key={idx} width={items.width}>{items && items.replace(/_/g, " ").toUpperCase()}</th>
                }
            }
        })
    }

    const renderTableBody = () => {
        return data && data.length > 0 && data.map((o, i) => {
            return <tr key={i}>{createTable(o, i)}</tr>
        })

    }

    const createTable = (result) => {
        return columns && columns.map((p, q) => {
            if (typeof p === 'object') {
                return <td key={q} style={p.alignment ? { textAlign: p.alignment, cursor: 'pointer' } : { cursor: 'pointer' }} onClick={() => !p.noPush && callback && callback(result.id)}>{getValue(result, p.name.toLowerCase())}</td>
            }
            else return <td key={q} style={{ cursor: 'pointer' }} onClick={() => callback && callback(result.id)}>{getValue(result, p)}</td>
        })
    }

    const getValue = (object, key) => {
        if (key && object) {
            if (key.includes(".")) {
                let arr = key.split(".")
                let value = object
                for (let i = 0; i < arr.length; i++) {
                    value = value[arr[i]]
                    if (!value) return "-"
                }
                return value
            } else {
                return object[key] ? object[key] : '-'
            }
        } else {
            return "-"
        }
    }

    return <table className={`${tableClass ? tableClass : ''} table table-hover`}>
        <thead className={HeaderClass ? HeaderClass : ''}>
            <tr>
                {renderTableHeader()}
            </tr>
        </thead>
        <tbody className={BodyClass ? BodyClass : ''}>
            {showTableBody && renderTableBody()}
            {showChildren && children}
        </tbody>
    </table>
}

export default Table