function github_req(user, cb) {
  makeRequest(
    'https://api.github.com/users/' + user + '/events',
    function (text) {
      var data = JSON.parse(text);
      cb(data);
    }
  );
}

var github_events = {
  CommitCommentEvent: function (event, user, repo) {
    return user+' commented on a commit in '+repo;
  },
  CreateEvent: function (event, user, repo, payload) {
    return user+' created '+(payload.ref?'a '+payload.ref_type+' in ':'')+repo;
  },
  DeleteEvent: function (event, user, repo, payload) {
    return user+' deleted a '+payload.ref_type+' in '+repo;
  },
  ForkEvent: function (event, user, repo) {
    return user+' forked '+repo;
  },
  GollumEvent: function (event, user, repo) {
    return user+' updated the wiki in '+repo;
  },
  IssueCommentEvent: function (event, user, repo) {
    return user+' commented on an issue in '+repo;
  },
  IssuesEvent: function (event, user, repo, payload) {
    return user+' '+payload.action+' an issue in '+repo;
  },
  MemberEvent: function (event, user, repo) {
    return user+' added a collaborator to '+repo;
  },
  PageBuildEvent: function (event, user, repo) {
    return null;
  },
  PublicEvent: function (event, user, repo) {
    return user+' made '+repo+' open source';
  },
  PullRequestEvent: function (event, user, repo, payload) {
    return user+' '+payload.action+' a pull request on '+repo;
  },
  PullRequestReviewCommentEvent: function (event, user, repo) {
    return user+' commented on a pull request on '+repo;
  },
  PushEvent: function (event, user, repo) {
    return user+' pushed to '+repo;
  },
  ReleaseEvent: function (event, user, repo) {
    return user+' released a new version of '+repo;
  },
  WatchEvent: function (event, user, repo) {
    return user+' starred '+repo;
  }
}

function github_widget(user, element) {
  github_req(user, function (data) {
    var github_list = document.createElement('ul');

    data = data.slice(0, 10);
    data.forEach(function (item) {
      var user, repo, event_str;

      user = '<a href="http://github.com/'+item.actor.login+'" target="_blank">'+item.actor.login+'</a>';
      repo = '<a href="http://github.com/'+item.repo.name+'" target="_blank">'+item.repo.name+'</a>';
      console.log(item.type, item.payload)
      if (github_events[item.type]) {
        event_str = github_events[item.type](item, user, repo, item.payload);
      } else {
        event_str = item.type;
      }

      if (event_str) {
        var li = document.createElement('li');
        github_list.appendChild(li);

        li.innerHTML = event_str;
        li.setAttribute('data-type', item.type);
      }

    });
    element.appendChild(github_list);
      var more = document.createElement('a');
      more.href = 'http://github.com/' + user;
      more.innerText = 'More...'
      more.target = '_blank';
      element.appendChild(more);
  });
}
