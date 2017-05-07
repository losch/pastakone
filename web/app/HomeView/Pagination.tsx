import Component from 'inferno-component';
import Button from '../components/Button';

interface PaginationProps {
  totalCount: number;
  offset: number;
  resultsPerPage: number;

  onOffsetChanged: (offset: number) => void;
}

export default class Pagination extends Component<PaginationProps, undefined> {
  constructor(props: PaginationProps) {
    super(props);

    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
  }

  private hasPrevPage() {
    return this.props.offset > 0;
  }

  private hasNextPage() {
    const {offset, resultsPerPage, totalCount} = this.props;
    return offset + resultsPerPage < totalCount;
  }

  private onPrev() {
    const {offset, resultsPerPage} = this.props;

    const nextOffset = offset > resultsPerPage ?
                       offset - resultsPerPage :
                       0;

    this.props.onOffsetChanged(nextOffset);
  }

  private onNext() {
    const {offset, resultsPerPage, totalCount} = this.props;

    const nextOffset = offset + resultsPerPage < totalCount ?
                       offset + resultsPerPage :
                       offset;

    this.props.onOffsetChanged(nextOffset);
  }

  private getCurrentPage() {
    return Math.floor(this.props.offset / this.props.resultsPerPage) + 1;
  }

  private getTotalPages() {
    return Math.ceil(this.props.totalCount / this.props.resultsPerPage);
  }

  render() {
    const totalCount = this.props.totalCount;

    return (
      <div>
        <Button onClick={this.onPrev}
                disabled={!this.hasPrevPage()}>Prev</Button>

        {this.getCurrentPage()} / {this.getTotalPages()}

        <Button onClick={this.onNext}
                disabled={!this.hasNextPage()}>Next</Button>

        {totalCount} {totalCount == 1 ? 'pasta' : 'pastas'}
      </div>
    );
  }
}
