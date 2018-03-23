import {VoteComponent} from './vote.component';

describe('VoteComponent', () => {
  let component: VoteComponent;

  beforeEach(() => {
    // ARRANGE => set our component
    component = new VoteComponent();
  });

  // HOOKS:
  // beforeEach();
  // beforeAll();
  // afterAll();
  // afterEach();

  it('should  increment totalVotes if upvoted', () => {
    // ACT
    component.upVote();

    // ASSERT => check if expected is correct
    expect(component.totalVotes).toBe(1);
  });

  it('should  decrenent totalVotes if downvoted', () => {
    component.downVote();

    expect(component.totalVotes).toBe(-1);
  });
});
