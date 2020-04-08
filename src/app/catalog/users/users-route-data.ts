import { User } from './user.model';
import { UserAddDialogComponent } from './user-dialog.component';

export const usersRouteData = {
  heading: 'Пользователи',
  addCaption: 'пользователя',
  apiUrl: '/admin/users',
  model: User,
  dialog: UserAddDialogComponent,
  furyListColumns: [
    {name: 'Id', property: 'id', visible: true, isModelProperty: true},
    {name: 'Ident', property: 'ident', visible: true, isModelProperty: true},
    {name: 'Name', property: 'name', visible: true, isModelProperty: true},
    {name: 'Email', property: 'email', visible: true, isModelProperty: true},
    {name: 'Phone', property: 'phone', visible: true, isModelProperty: true},
    {name: 'Role', property: 'role', visible: true, isModelProperty: true},
    {name: 'Actions', property: 'actions', visible: true},
  ],
};
