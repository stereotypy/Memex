import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './IndexDropdown.css'
import annotationStyles from './IndexDropdownAnnotation.css'

/**
 * @augments {PureComponent<{onTagSearchChange: any, onTagSearchKeyDown: any, setInputRef: any, numberOfTags: any, tagSearchValue: any}, *>}
 */
class IndexDropdown extends PureComponent {
    static propTypes = {
        children: PropTypes.array.isRequired,
        onTagSearchChange: PropTypes.func.isRequired,
        onTagSearchKeyDown: PropTypes.func.isRequired,
        numberOfTags: PropTypes.number.isRequired,
        setTagDivRef: PropTypes.func,
        setInputRef: PropTypes.func.isRequired,
        tagSearchValue: PropTypes.string.isRequired,
        hover: PropTypes.bool,
        isForAnnotation: PropTypes.bool,
        source: PropTypes.oneOf(['tag', 'domain', 'list']).isRequired,
        url: PropTypes.string,
        allowAdd: PropTypes.bool,
    }

    componentWillMount() {
        this.styles = this.props.isForAnnotation ? annotationStyles : styles
    }

    get mainClass() {
        return cx(this.styles.tagDiv, {
            [this.styles.tagDivFromOverview]: this.props.hover,
            [this.styles.tagDivForFilter]: !this.props.url,
        })
    }

    get searchPlaceholder() {
        return `Search & Add ${this.placeholder}`
    }

    get placeholder() {
        let placeholder
        switch (this.props.source) {
            case 'tag':
                placeholder = 'Tags'
                break
            case 'domain':
                placeholder = 'Domain'
                break
            case 'list':
                placeholder = 'Lists'
                break
            default:
        }
        return placeholder
    }

    get unit() {
        return this.placeholder.toLowerCase()
    }

    render() {
        return (
            <div className={this.mainClass} ref={this.props.setTagDivRef}>
                <form
                    className={cx(this.styles.searchContainer, {
                        [this.styles.commentBox]: this.props.allowAdd,
                    })}
                >
                    <input
                        className={this.styles.search}
                        name="query"
                        placeholder={this.searchPlaceholder}
                        onChange={this.props.onTagSearchChange}
                        onKeyDown={this.props.onTagSearchKeyDown}
                        ref={this.props.setInputRef}
                        autoComplete="off"
                        value={this.props.tagSearchValue}
                        autoFocus
                    />
                    <i className="material-icons">search</i>
                </form>
                <div className={this.styles.tagContainer}>
                    {this.props.children}
                </div>
                <div className={this.styles.summaryTagContainer}>
                    <div className={this.styles.numberTags}>
                        <span className={this.styles.bold}>
                            {this.props.numberOfTags}
                        </span>{' '}
                        {this.unit} selected
                    </div>
                </div>
            </div>
        )
    }
}

export default IndexDropdown
