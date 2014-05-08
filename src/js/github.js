function github_req(user, cb) {
  makeRequest(
    'https://api.github.com/users/' + user + '/events',
    function (text) {
      var data = JSON.parse(text);
      cb(data);
    }
  );
}

function github_widget(user, element) {
  github_req('grit96', function (data) {
    var github_list = document.createElement('ul');

    data = data.slice(0, 10);
    data.forEach(function (item) {
      var user = item.actor.login.charAt(0).toUpperCase() + item.actor.login.slice(1); // Capitalize
      var repo = item.repo.name;
      var type;
      if (item.type == 'PushEvent') {
        type = 'pushed to';
      } else if (item.type == 'IssuesEvent') {
        type = 'created an issue on';
      } else if (item.type == 'CommitCommentEvent') {
        type = 'commented on a commit in';
      } else if (item.type == 'IssueCommentEvent') {
        type = 'commented on an issue in';
      } else if (item.type == 'ForkEvent') {
        type = 'forked';
      } else {
        type = item.type;
      }

      var li = document.createElement('li');
      github_list.appendChild(li);

      li.innerHTML = user+' '+type+' <a href="http://github.com/'+repo+'" target="_blank">'+repo+'</a>';
      li.setAttribute('data-type', item.type);

    });
    element.appendChild(github_list);
      var more = document.createElement('a');
      more.href = 'http://github.com/grit96';
      more.innerText = 'More...'
      more.target = '_blank';
      element.appendChild(more);
  });
}
