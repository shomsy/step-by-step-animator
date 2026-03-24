# HTML Timeline

```json
[
  {
    "from": "empty_shell",
    "target": "root",
    "lines": [
      "<div class=\"app-shell\">",
      "  @@slot:app-shell-content@@",
      "</div>"
    ]
  },
  {
    "from": "component_html",
    "target": "app-shell-content",
    "lines": [
      "  <ui-user-avatar",
      "    username=\"Ana Petrović\"",
      "    role=\"Frontend Lead\"",
      "    @@slot:avatar-attributes@@",
      "  >",
      "    @@slot:avatar-slots@@",
      "  </ui-user-avatar>"
    ]
  },
  {
    "from": "status_attribute_html",
    "target": "avatar-attributes",
    "lines": [
      "    status=\"online\""
    ]
  },
  {
    "from": "profile_url_attribute_html",
    "target": "avatar-attributes",
    "lines": [
      "    profile-url=\"/team/ana-petrovic\""
    ]
  },
  {
    "from": "initials_slot_html",
    "target": "avatar-slots",
    "lines": [
      "    <span slot=\"initials\">AP</span>"
    ]
  },
  {
    "from": "tooltip_slot_html",
    "target": "avatar-slots",
    "lines": [
      "    <span slot=\"tooltip\">Ana Petrović · Frontend Lead · Dostupna</span>"
    ]
  }
]
```
