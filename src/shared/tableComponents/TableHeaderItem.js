import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { capitalString } from '../../helpers/GeneralHelpers';

class FilterActionHeader extends Component {
    state = {
        showTitle: false,
        limit: 10,
        filter: [],
        filter_restore: []
    };

    componentDidMount() {
        this.setState({
            filter: [...this.props.filter],
            filter_restore: [...this.props.filter]
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.filter !== prevProps.filter) {
            this.setState({
                filter: [...this.props.filter]
            });
        }
    }

    onFilterChange(e, fetch) {
        const self = this;
        const { applyFilterOnSelect } = self.props;
        let { name } = e.target;
        let { value } = e.target;
        let filter = [...self.state.filter];
        let index = filter.findIndex(x => x.key === name);
        if (index > -1) {
            let d = { ...filter[index] };
            d['value'] = value;
            filter[index] = d;
            self.setState({
                filter
            });
        }

        if (applyFilterOnSelect) self.props.onApplyFilters(filter);
    }

    onToggleShowFilter() {
        const self = this;
        let filter = [...this.state.filter_restore];
        self.setState(
            {
                filter
            },
            () => {
                self.props.onToggleShowFilter();
            }
        );
    }

    onApplyFilters() {
        const self = this;
        self.setState(
            {
                filter_restore: [...this.state.filter]
            },
            () => {
                self.props.onApplyFilters(this.state.filter_restore);
            }
        );
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.onApplyFilters();
        }
    }

    deleteActiveFilter(key) {
        const self = this;
        let filter_restore = [...this.state.filter_restore];
        let index = filter_restore.findIndex(x => x.key === key);
        if (index > -1) {
            let i = filter_restore[index];
            i['value'] = '';
            filter_restore[index] = i;
            self.setState(
                {
                    filter_restore
                },
                () => {
                    self.props.deleteActiveFilter(key);
                }
            );
        }
    }

    clearActiveFilter(e) {
        const self = this;
        let filter_restore = [...this.state.filter_restore];
        filter_restore.map(i => {
            i['value'] = '';
        });
        self.setState(
            {
                filter_restore,
                filter: filter_restore
            },
            () => {
                self.props.clearActiveFilter();
            }
        );
    }

    getTitle(value, options) {
        let label = '';
        for (let single of options) {
            if (value === single.value + '') {
                label = single.name;
                break;
            }
        }
        return label;
    }

    render() {
        let {
            limit,
            limitChange,
            showFilterOptions,
            onToggleShowFilter,
            min,
            applyFilterOnSelect,
            nonSticky,
            showFilterIcon
        } = this.props;

        let filter = [...this.state.filter];
        let filter_restore = [...this.state.filter_restore];
        let activeFilter = [];
        filter_restore.map(i => {
            if (i.value) activeFilter.push(i);
        });
        let filtersList = [];
        Object.keys(filter).map(index => {
            let item = filter[index];
            let nextIndex = index * 1 + 1;
            if (item.range === 'from') {
                if (nextIndex < filter.length && filter[nextIndex].range === 'to') {
                    filtersList.push(
                        <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6 auto-clear-lg-3 '>
                            <div className='form-group width-100'>
                                <label className='dropdown-title'>
                                    {' '}
                                    {item.name ? item.name : capitalString(item.key)}{' '}
                                </label>
                                <div className='row'>
                                    <div className='col-xs-3'>
                                        <label className='dropdown-sub-title'>from</label>
                                    </div>
                                    <div className='col-xs-9'>
                                        <input
                                            className='form-control dropdown-form-control input-sm width-100'
                                            type='date'
                                            name={item.key}
                                            onChange={e => this.onFilterChange(e)}
                                            value={item.value}
                                        />
                                    </div>
                                </div>
                                <div className='row admin-margin-top'>
                                    <div className='col-xs-3'>
                                        <label className='dropdown-sub-title'>to</label>
                                    </div>
                                    <div className='col-xs-9'>
                                        <input
                                            className='form-control dropdown-form-control input-sm'
                                            name={filter[nextIndex].key}
                                            type='date'
                                            onChange={e => this.onFilterChange(e)}
                                            value={filter[nextIndex].value}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    filtersList.push(
                        <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6 auto-clear-lg-3 '>
                            {item.type === 'select' ? (
                                <div className='form-group width-100'>
                                    <label className='dropdown-title'>
                                        {' '}
                                        {item.name ? capitalString(item.name) : capitalString(item.key)}{' '}
                                    </label>
                                    <br />
                                    <select
                                        className='form-control input-sm width-100'
                                        name={item.key}
                                        onChange={e => this.onFilterChange(e)}
                                        value={item.value}
                                        onKeyPress={e => this.onKeyPress(e)}>
                                        <option value='-----'>Select {item.name}</option>
                                        {item.options &&
                                            item.options.map(o => <option value={o.value}>{o.name}</option>)}
                                    </select>
                                </div>
                            ) : (
                                <div className='form-group width-100'>
                                    <label className='dropdown-title'>
                                        {' '}
                                        {item.name ? capitalString(item.name) : capitalString(item.key)}{' '}
                                    </label>
                                    <br />
                                    <input
                                        className='form-control dropdown-form-control input-sm width-100'
                                        name={item.key}
                                        type={item.type ? item.type : 'text'}
                                        onChange={e => this.onFilterChange(e)}
                                        value={item.value}
                                    />
                                    min={item.min}
                                </div>
                            )}
                        </div>
                    );
                }
            } else if (item.range !== 'to') {
                filtersList.push(
                    <div className='col-lg-3 col-md-3 col-sm-6 col-xs-6 auto-clear-lg-3 '>
                        {item.type === 'select' ? (
                            <div className='form-group width-100'>
                                <label className='dropdown-title'>
                                    {' '}
                                    {item.name ? capitalString(item.name) : capitalString(item.key)}{' '}
                                </label>
                                <br />
                                <select
                                    className='form-control input-sm width-100'
                                    name={item.key}
                                    onChange={e => this.onFilterChange(e)}
                                    value={item.value}
                                    onKeyPress={e => this.onKeyPress(e)}>
                                    <option value='-----'>Select {item.name}</option>
                                    {item.options &&
                                        item.options.map(o => <option value={o.value}>{o.name}</option>)}
                                </select>
                            </div>
                        ) : (
                            <div className='form-group width-100'>
                                <label className='dropdown-title'>
                                    {' '}
                                    {item.name ? capitalString(item.name) : capitalString(item.key)}{' '}
                                </label>
                                <br />
                                <input
                                    className='form-control dropdown-form-control input-sm width-100'
                                    name={item.key}
                                    min={item.min}
                                    type={item.type ? item.type : 'text'}
                                    onChange={e => this.onFilterChange(e)}
                                    onKeyPress={e => this.onKeyPress(e)}
                                    value={item.value}
                                />
                            </div>
                        )}
                    </div>
                );
            }
        });

        return (
            <div className={nonSticky ? 'actionHeaderFilterNonSticky' : 'actionHeaderFilter'}>

                <div className='' style={{ paddingBottom: '0' }}>
                    <div className='dataTables_wrapper datatableFilterBarFixed'>
                        <div className='row' >
                            <div className='col-lg-6 col-6'>
                                {!this.props.hidelimit && (
                                    <div className='dataTables_length pt-2' id='example1_length'>
                                        <label className="d-inline-flex mb-0"><p className="mt-2 mr-1 mb-0">Show &nbsp;</p>
                                            <select
                                                name='example1_length'
                                                value={limit}
                                                onChange={e => limitChange(e)}
                                                className='form-control input-sm'>
                                                {!['10', '25', '50', '100'].includes(limit) && (
                                                    <option value={limit}>{limit}</option>
                                                )}
                                                <option value='10'>10</option>
                                                <option value='25'>25</option>
                                                <option value='50'>50</option>
                                                <option value='100'>100</option>
                                            </select>
                                            <p className="mt-2 mb-0">&nbsp;entries</p>
                                        </label>
                                    </div>
                                )}
                            </div>
                            <div className='col-lg-6 col-6 text-right pt-2'>
                                {onToggleShowFilter && (
                                    <div
                                        className={
                                            showFilterOptions ? ' pull-right' : 'pull-right'
                                        }>
                                        {showFilterOptions ? (
                                            <div className='active'>
                                                <button
                                                    className='btn btn-secondary btn-sm'
                                                    onClick={e => this.onToggleShowFilter(e)}
                                                    style={{ color: '#06a559' }}>
                                                    <i className='fas fa-filter'></i>&nbsp;Filters
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <button
                                                    onClick={e => onToggleShowFilter(e)}
                                                    className='btn btn-secondary btn-sm'
                                                >
                                                    <i className='fas fa-filter'></i>&nbsp;Filters
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {activeFilter.length > 0 && (
                        <div className="row d-flex align-items-center" style={{ padding: '8px 0px 5px 0px' }}>
                            <div className="col-md-2"> Active Filters :</div>
                            <div className="col-md-8">
                                {activeFilter.map(i => (
                                    <div className="thumbnailList" style={{ paddingBottom: '0px' }}>
                                        <span data-src="8" className="badge bg-light">
                                            <span style={{ fontWeight: '500' }}>
                                                {capitalString(i.name)} :
                                            </span>
                                            <span style={{ fontWeight: '400', paddingRight: '10px' }}>
                                                {i.type === 'select' ? this.getTitle(i.value, i.options) : i.value}
                                            </span>
                                            <i className="fa fa-times-circle text-danger" style={{ cursor: 'pointer' }} onClick={e => this.deleteActiveFilter(i.key, e)}></i></span>
                                    </div>
                                ))}
                            </div>
                            <div className="col-md-2">
                                <button
                                    className='btn btn-sm btn-secondary width-100'
                                    onClick={e => this.clearActiveFilter(e)}>
                                    <span>
                                        <i className='ri-arrow-go-back-fill'></i>
                                    </span>
                                    &nbsp;Clear all
                                </button>
                            </div>
                        </div>
                    )}
                    {showFilterOptions === true && (
                        <div className='tab-content' style={{ border: '1px solid #ddd', borderRadius: '.5rem' }}>
                            <div className='tab-pane active filterOpenTab' >
                                <div className="row">
                                    {filtersList}
                                    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-6 auto-clear-lg-3 ">
                                        {!applyFilterOnSelect && (
                                            <div className="form-group width-100">
                                                <label> &nbsp; </label>
                                                <br />
                                                <button
                                                    className='btn btn-success width-100'
                                                    onClick={e => this.onApplyFilters(e)}>
                                                    Apply Filters
                                                </button>
                                            </div>

                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    )}
                </div>

            </div>
        );
    }
}

function mapStateToProps(state) { }

export default connect(mapStateToProps)(FilterActionHeader);
